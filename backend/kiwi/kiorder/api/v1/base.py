from django.views import View
from django.views.decorators.csrf import csrf_exempt
from kiorder.models import Store


from django.http import JsonResponse
from ..errors import Abort

class BaseResource(View):
    login_required = False

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
    def dispatch(self, request, *args, **kwargs):
        self.request = request
        try:
            if self.login_required and not request.user.is_authenticated:
                self.abort(code="AUTH-001", message="Login required", status_code=401)
            return super().dispatch(request, *args, **kwargs)
        except Abort as exc:
            return self.error(
                code=exc.code,
                message=exc.message,
                status_code=exc.status_code
            )




