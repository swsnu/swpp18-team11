from django.views import View
from django.views.decorators.csrf import csrf_exempt
from kiorder.models import Store


from django.http import JsonResponse
from ..errors import Abort

class BaseResource(View):
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
        # TODO
        try:
            return self.store
        except AttributeError:
            self.store = store = Store.objects.order_by('id').first()
            if not store:
                self.abort(status_code=404, message="No store")
            return store

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        try:
            return super().dispatch(request, *args, **kwargs)
        except Abort as exc:
            return self.error(
                code=exc.code,
                message=exc.message,
                status_code=exc.status_code
            )




