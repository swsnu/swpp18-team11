
from kiorder.models import PurchasableCategory

from .store import StoreService

class MenuService:
    def new_purchasable_category(self, **kwargs):
        purchasable_category = PurchasableCategory(**kwargs)
        purchasable_category.save()
        return purchasable_category

    def get_menu(self, store):
        store_service = StoreService()
        purchasable_categories = store_service.purchasable_categories(store)
        menu = Menu(store, purchasable_categories)
        return menu

    def save_menu(self, menu):
        for purchasable_category in menu.purchasable_categories:
            purchasable_category.save()
        if menu.dirty:
            menu.store.purchasable_categories.set(menu.purchasable_categories)
            menu.store.save()
            menu.undirty()


class Menu:
    def __init__(self, store, purchasable_categories):
        self.store = store
        self._purchasable_categories = purchasable_categories
        self._dirty = False

    def add_purchasable_category(self, purchasable_category):
        self._purchasable_categories.append(purchasable_category)
        self._dirty = True

    def remove_purchasable_category(self, purchasable_category):
        cat = self._purchasable_categories.remove(purchasable_category)
        self._dirty = True

    @property
    def purchasable_categories(self):
        return self._purchasable_categories

    @property
    def dirty(self):
        return self._dirty

    def undirty(self):
        self._dirty = False


__all__ = ['MenuService']
