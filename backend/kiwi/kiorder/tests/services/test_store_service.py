import pytest

from kiorder.services.store import StoreService
from kiorder.models import Store
from django.contrib.gis.geos import Point
from django.forms.models import model_to_dict


@pytest.mark.django_db
def test_spatial_search(store_1):
    service = StoreService()

    # 1 deg latitude corresponds to about 110.574 km
    store_2 = Store(
        name="Store nearby store 1",
        location=Point(store_1.location.x, store_1.location.y + 1.0),
        franchise=store_1.franchise,
        timezone="UTC",
    )
    store_2.save()

    stores = service.search_nearby(
        franchise=store_1.franchise, 
        lng=store_1.location.x,
        lat=store_1.location.y,
        radius=90,
    )
    assert len(stores) == 1
    assert stores[0] == store_1

    stores = service.search_nearby(
        franchise=store_1.franchise, 
        lng=store_1.location.x,
        lat=store_1.location.y,
        radius=200,
    )
    assert len(stores) == 2
    assert stores[0] == store_1
    assert stores[1] == store_2



