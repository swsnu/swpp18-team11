from .base import BaseResource

from kiorder.services.store import StoreService

class Purchasable(BaseResource):
    def represent_option(self, option):
        return {
            "id": option.id,
            "name": option.name,
            "base_price": option.base_price,
            "max_capacity": option.max_capacity,
        }

    def represent_purchasable(self, purch):
        return {
            "id": purch.id,
            "name": purch.name,
            "thumbnail": purch.image and purch.image.url or None, 
            "base_price": purch.base_price,
            "options": [
                self.represent_option(option)
                for option in purch.purchasable_options.all()
            ]
        }

    def represent(self, purchasable_category):
        return {
            "name": purchasable_category.name,
            "purchasables": [
                self.represent_purchasable(purch)
                for purch
                in purchasable_category.purchasables.all()
            ]
        }

    def get_purchasable_by_id(self, purchasable_categories, purch_id):
        for pc in purchasable_categories:
            for p in pc.purchasables.all():
                if p.id == purch_id:
                    return p

        return None

    def get(self, request, **kwargs):
        store_service = StoreService()
        store = self.get_current_store()
        purchasable_categories = store_service.purchasable_categories(store)

        if 'id' in kwargs.keys():
            purch_id = kwargs.get('id')
            purchasable = self.get_purchasable_by_id(purchasable_categories, purch_id)
            if purchasable:
                return self.success(self.represent_purchasable(purchasable))
            else:
                return self.error(message="Menu not found")

        return self.success({
            "list": [
                self.represent(pc)
                for pc in purchasable_categories
            ]
        })


