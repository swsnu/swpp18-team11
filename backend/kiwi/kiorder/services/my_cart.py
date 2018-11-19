from dataclasses import dataclass, field

from .store import StoreService
from ..models import Store, Ticket, MyCart, MyCartItem, User
from typing import List, Optional

@dataclass
class MyCartService:
    store_service: StoreService = field(default_factory=StoreService)

    def my_cart_of(self, store: Store, user: User):
        query = MyCart.objects.filter(store = store, user = user).first()
        if not query: # create new cart
            query = MyCart(user=user, store=store)
            query.save()
        return query

    def load(self, id) -> Optional[MyCart]:
        return MyCart.objects.filter(id=id).first()

    def load_item(self, item_id) -> Optional[MyCartItem]:
        return MyCartItem.objects.filter(id=item_id).first()
