from .utils import CompatList

class StoreService:
    def purchasable_categories(self, store):
        return CompatList(store.purchasable_categories.all())

