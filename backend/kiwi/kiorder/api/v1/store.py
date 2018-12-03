from .base import BaseResource

from kiorder.services.store import StoreService
from kiorder.models import Franchise, Store

class BaseStore(BaseResource):
    login_required = True
    
    def represent_store(self, store: Store):
        return {
            "id": store.id,
            "name": store.name,
            "location": {
                "lng": store.location.x,
                "lat": store.location.y,
            },
            "franchise_id": store.franchise.id,
            "timezone": store.timezone,
        }


class StoreOfFranchise(BaseStore):
    def get(self, request, *, franchise_id):
        params = request.GET
        try:
            franchise = Franchise.objects.get(pk=franchise_id)
            lng = float(params['lng'])
            lat = float(params['lat'])
            radius_in_km = float(params['radius_in_km'])
        except (KeyError, ValueError):
            self.abort(status_code=400)
        except Franchise.DoesNotExist:
            self.abort(status_code=404)

        stores = StoreService().search_nearby(
            franchise=franchise,
            lng=lng,
            lat=lat,
            radius=radius_in_km,
        )
        return self.success([self.represent_store(store) for store in stores])


class StoreDetail(BaseStore):
    def get(self, request, *, id):
        try:
            store = Store.objects.get(id=id)
            return self.success(self.represent_store(store))
        except Store.DoesNotExist:
            return self.error(message=f"Store {id} not found", status_code=404)

