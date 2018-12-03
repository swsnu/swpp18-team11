from .base import BaseResource

from kiorder.services.store import StoreService
from kiorder.models import Purchasable as PurchasableModel

class Purchasable(BaseResource):
    def represent_option(self, option):
        return {
            "id": option.id,
            "name": option.name,
            "base_price": option.base_price,
            "max_capacity": option.max_capacity,
        }

    def represent_badge(self, badge):
        return {
            "id": badge.id,
            "name": badge.name,
            "icon": badge.icon and badge.icon.url or None
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
            ],
            "badges": [
                self.represent_badge(badge)
                for badge in purch.badges.all()
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

    def get_purchasable_by_id(self, purch_id):
        try:
            return PurchasableModel.objects.get(id=purch_id)
        except PurchasableModel.DoesNotExist:
            return None

    def get(self, request, **kwargs):
        store_service = StoreService()
        store = self.get_current_store()
        purchasable_categories = store_service.purchasable_categories(store)

        if 'id' in kwargs.keys():
            purch_id = kwargs.get('id')
            purchasable = self.get_purchasable_by_id(purch_id)
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


