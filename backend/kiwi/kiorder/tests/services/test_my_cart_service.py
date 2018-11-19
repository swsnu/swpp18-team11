import pytest

from kiorder.services.my_cart import MyCartService
from kiorder.models import MyCart


@pytest.mark.django_db
def test_my_cart_load(my_cart_1):
    assert MyCartService().load(my_cart_1.id) == my_cart_1

@pytest.mark.django_db
def test_my_cart_load_item(my_cart_item_1):
    assert MyCartService().load_item(my_cart_item_1.id) == my_cart_item_1

@pytest.mark.django_db
def test_my_cart_of(store_1, user_1, my_cart_1):
    assert MyCartService().my_cart_of(store_1, user_1) == my_cart_1
