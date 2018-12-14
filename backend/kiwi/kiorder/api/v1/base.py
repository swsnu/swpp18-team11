import json

from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
from kiorder.models import Store


from django.http import JsonResponse
from ..errors import Abort

class BaseResource(View):
    login_required = False
    use_api_cache = False
    api_cache_timeout = 60

    def success(self, data=None):
        return JsonResponse({
            "success": True,
            "data": data,
        })

    def error(self, code="GENERAL-000", message="", status_code=200):
        resp = JsonResponse({
            "success": False,
            "code": code,
            "message": message,
        })
        resp.status_code = status_code
        return resp

    def abort(self, code="GENERAL-000", message="", status_code=200):
        raise Abort(code, message, status_code)

    def get_current_store(self) -> Store:
        try:
            return self.store
        except AttributeError:
            current_user = self.request.user
            if current_user.is_authenticated:
                store = current_user.current_store
            else:
                store = None
            if not store:
                self.abort(code="NOSTORE-001", status_code=404, message="No store set")
            self.store = store
            return store

    @csrf_exempt
    def dispatch(self, request, **kwargs):
        self.request = request
        try:
            if self.login_required and not request.user.is_authenticated:
                self.abort(code="AUTH-001", message="Login required", status_code=401)
            return self._possibly_cached_dispatch(request, **kwargs)
        except Abort as exc:
            return self.error(
                code=exc.code,
                message=exc.message,
                status_code=exc.status_code
            )

    def _possibly_cached_dispatch(self, request, **kwargs):
        if request.method == 'GET' and self.use_api_cache:
            return self._definitely_cached_dispatch(request, **kwargs)
        else:
            return super().dispatch(request, **kwargs)

    def _definitely_cached_dispatch(self, request, **kwargs):
        cache_default = cache
        cls = self.__class__
        kw_key_part = ":".join(f"{k}-{kwargs[k]}" for k in sorted(kwargs.keys()))
        key = f"api_cache:{cls.__module__}.{cls.__name__}:{kw_key_part}"
        result = cache_default.get(key)
        if result is not None:
            cache_cell = json.loads(result)
            status_code = int(cache_cell['status_code'])
            body = cache_cell['body']
            resp = JsonResponse(body, safe=False)
            resp.status_code = status_code
            return resp
        response = super().dispatch(request, **kwargs)
        if not isinstance(response, JsonResponse):
            raise TypeError(f"Only JsonResponse can be cached (got {result!r})")
        body = json.loads(response.content.decode())
        status_code = response.status_code

        cache_default.set(
            key,
            json.dumps({"body": body, "status_code": status_code}),
            timeout=self.api_cache_timeout
        )
        return response
