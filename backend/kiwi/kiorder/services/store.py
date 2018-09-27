from django.db import models

from ..models import Store
from .utils import CompatList

class StoreService:
    def purchasable_categories(self, store: Store):
        return CompatList(store.purchasable_categories.all())

    def pop_ticket_number(self, store: Store):
        Store.objects.filter(id=store.id).update(next_number=models.F('next_number') + 1)
        store.refresh_from_db()
        return store.next_number

