import pytest
import json
from unittest.mock import patch, MagicMock
from kiorder.models import Purchasable, PurchasableOption, User, MyCart, MyCartItem, MyCartItemOption
from django.core.serializers.json import DjangoJSONEncoder
from kiorder.services.tx import TxService, OrderSpec


@pytest.fixture
def my_cart():
    purchasable_option = MagicMock(name="PurchasableOption")
    purchasable_option.id = 4
    purchasable_option.name = 'Option 1'
    purchasable_option.base_price = 100
    purchasable_option.max_capacity = 10
    purchasable_option.qty = 20

    purchasable = MagicMock("Purchasable")
    purchasable.id = 3
    purchasable.name = "Purchasable 1"
    purchasable.image = "image"
    purchasable.qty = 10

    my_cart_item_option = MagicMock(name="MyCartItemOption")
    my_cart_item_option.qty = 20
    my_cart_item_option.purchasable_option.id = 4
    my_cart_item_option.purchasable_option.name = "Option 1"
    my_cart_item_option.purchasable_option.base_price = 100
    my_cart_item_option.purchasable_option.max_capacity = 10

    my_cart_item = MagicMock(name="MyCartItem")
    my_cart_item.id = 2
    my_cart_item.qty = 10
    my_cart_item.purchasable_id = 3
    my_cart_item.purchasable.name = "Purchasable 1"
    my_cart_item.purchasable.base_price = 1000
    my_cart_item.purchasable.image = None

    my_cart_item.mycartitemoption_set = MagicMock()
    my_cart_item.mycartitemoption_set.all.return_value = [my_cart_item_option]
    my_cart_item.purchasable.badges.all.return_value = []

    my_cart = MagicMock(name="MyCart")
    my_cart.id = 1
    my_cart.mycartitem_set = MagicMock()
    my_cart.mycartitem_set.all.return_value = [my_cart_item]

    return my_cart


@pytest.fixture
def my_cart_item():
    purchasable_option = MagicMock(name="PurchasableOption")
    purchasable_option.id = 4
    purchasable_option.name = 'Option 1'
    purchasable_option.base_price = 100
    purchasable_option.max_capacity = 10
    purchasable_option.qty = 20

    purchasable = MagicMock("Purchasable")
    purchasable.id = 3
    purchasable.name = "Purchasable 1"
    purchasable.image = "image"
    purchasable.qty = 10

    my_cart_item_option = MagicMock(name="MyCartItemOption")
    my_cart_item_option.qty = 20
    my_cart_item_option.purchasable_option.id = 4
    my_cart_item_option.purchasable_option.name = "Option 1"
    my_cart_item_option.purchasable_option.base_price = 100
    my_cart_item_option.purchasable_option.max_capacity = 10

    my_cart_item = MagicMock(name="MyCartItem")
    my_cart_item.id = 2
    my_cart_item.qty = 10
    my_cart_item.purchasable_id = 3
    my_cart_item.purchasable.name = "Purchasable 1"
    my_cart_item.purchasable.base_price = 1000
    my_cart_item.purchasable.image = None

    my_cart_item.mycartitemoption_set = MagicMock()
    my_cart_item.mycartitemoption_set.all.return_value = [my_cart_item_option]
    my_cart_item.purchasable.badges.all.return_value = []
    return my_cart_item


@pytest.fixture
def order_spec():
    purchasable_option = MagicMock(name="PurchasableOption")
    purchasable_option.id = 4
    purchasable_option.name = 'Option 1'

    purchasable = MagicMock("Purchasable")
    purchasable.id = 3
    purchasable.name = "Purchasable 1"

    order_spec = MagicMock("OrderSpec")
    purchasable_spec_1 = MagicMock("PurchasableSpec")
    purchasable_spec_2 = MagicMock("PurchasableSpec")
    purchasable_spec_1.qty = 1
    purchasable_spec_1.purchasable = purchasable
    purchasable_spec_2.qty = 1
    purchasable_spec_2.purchasable = purchasable

    purchasable_option_spec_1 = MagicMock("PurchasableOptionSpec")
    purchasable_option_spec_2 = MagicMock("PurchasableOptionSpec")
    purchasable_option_spec_1.qty = 2
    purchasable_option_spec_1.purchasable_option = purchasable_option
    purchasable_option_spec_2.qty = 4
    purchasable_option_spec_2.purchasable_option = purchasable_option

    purchasable_spec_1.purchasable_option_specs = [purchasable_option_spec_1, purchasable_option_spec_2]
    order_spec.purchasable_specs = [purchasable_spec_1, purchasable_spec_2]

    return order_spec()

@pytest.fixture
def my_cart_repr():
    return {
        "id": 1,
        "purchasables": [
            {
                "item_id": 2,
                "purchasable_id": 3,
                "name": "Purchasable 1",
                "thumbnail": None,
                "base_price": 1000,
                "qty": 10,
                "options": [
                    {
                        "id": 4,
                        "name": "Option 1",
                        "base_price": 100,
                        "max_capacity": 10,
                        "qty": 20
                    }
                ],
                "badges": []
            }
        ]
    }


@pytest.fixture
def MyCartService(store, my_cart, my_cart_item):
    with patch('kiorder.api.v1.base.Store') as Store, \
            patch('kiorder.api.v1.my_cart.MyCartService') as MyCartService:
        instance = MyCartService.return_value
        instance.get_my_cart_of.return_value = my_cart
        instance.load_item.return_value = my_cart_item
        instance.delete_item.return_value = True
        instance.create_item_by_order_spec.return_value = True
        instance.patch_item.return_value = my_cart_item
        instance.save_item.return_value = my_cart_item
        instance.save_item_option.return_value = True
        User.objects = MagicMock()
        User.objects.get= MagicMock()
        User.objects.get.return_value= User()

        yield MyCartService


@pytest.fixture
def TxService(store, order_spec):
    with patch('kiorder.api.v1.my_cart.TxService') as TxService:
        instance = TxService.return_value
        instance.parse_spec_order_line.return_value = order_spec
        yield TxService


def test_get_my_cart(MyCartService, client, my_cart, my_cart_repr):
    response = client.get('/kiorder/api/v1/mycart/')
    assert response.status_code == 200


def test_post_my_cart(MyCartService, TxService, client):
    order_spec_line = '1-1#1-2#3-4 2-1'
    response = client.post('/kiorder/api/v1/mycart/', {"order_spec": order_spec_line})
    assert response.status_code == 200
    TxService().parse_order_spec_line.assert_called()
    MyCartService().create_item_by_order_spec.assert_called()


def test_delete_my_cart(MyCartService, client, my_cart):
    response = client.delete('/kiorder/api/v1/mycart/2')
    MyCartService().load_item.assert_called()
    MyCartService().delete_item.assert_called()
    assert response.status_code == 200
    assert response.json() == {"success": True, "data": None}


def test_patch_my_cart(MyCartService, client, my_cart_item):
    # qty case
    response = client.patch('/kiorder/api/v1/mycart/2', "qty=2")
    assert response.status_code == 200
    MyCartService().patch_item.assert_called()
    # options case
    response = client.patch('/kiorder/api/v1/mycart/2', "option_spec=1-1")
    assert response.status_code == 200
    MyCartService().patch_item.assert_called()
