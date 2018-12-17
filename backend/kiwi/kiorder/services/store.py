from django.db import models
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance

from ..models import Store, Franchise
from .utils import CompatList

from typing import List

km = float

class StoreService:
    def search_nearby(self, *,
                      franchise_list: List[Franchise],
                      lng: float,
                      lat: float,
                      radius: km) -> List[Store]:

        def flatten(list_of_lists):
            return sum(list_of_lists, [])

        point = Point(lng, lat)
        distance = Distance(km=radius)
        stmt_list = list(
            map(lambda franchise: Store.objects.filter(
                    franchise=franchise,
                    location__distance_lte=(point, distance)),
                franchise_list
                )
        )
        stores = flatten([[store for store in stmt.all()] for stmt in stmt_list])
        stores.sort(key=lambda store: store.location.distance(point))
        return stores

    def purchasable_categories(self, store: Store):
        return CompatList(store.purchasable_categories.all())

    def pop_ticket_number(self, store: Store):
        Store.objects.filter(id=store.id).update(next_number=models.F('next_number') + 1)
        store.refresh_from_db()
        return store.next_number

