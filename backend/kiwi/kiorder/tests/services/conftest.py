import pytest

from kiorder.models import Purchasable, PurchasableOption, Store, Franchise
from django.contrib.gis.geos import Point


@pytest.fixture
def franchise_1():
    x = Franchise(name="Franchise 1")
    x.save()
    return x

@pytest.fixture
def store_1(franchise_1):
    x = Store(
        name="Store 1",
        location=Point(-0.000500, 51.476852),
        franchise=franchise_1,
        timezone="UTC",
    )
    x.save()
    return x


@pytest.fixture
def purchasable_1():
    x = Purchasable(name="Purchasable 1", base_price=10000)
    x.save()
    return x

@pytest.fixture
def purchasable_2():
    x = Purchasable(name="Purchasable 2", base_price=20000)
    x.save()
    return x

@pytest.fixture
def purchasable_option_1():
    x = PurchasableOption(
        name="Option 1",
        base_price=1000,
        max_capacity=2,
    )
    x.save()
    return x

@pytest.fixture
def purchasable_option_2():
    x = PurchasableOption(
        name="Option 2",
        base_price=500,
        max_capacity=1,
    )
    x.save()
    return x

