import pytest
import json

from unittest.mock import patch, MagicMock


@pytest.fixture
def my_cart():
    purchasable_option = MagicMock(name="PurchsableOption")
    purchasable_option.id = 3
    purchasable_option.name = 'Purchasable Option 1'

    purchasable = MagicMock("Purchasable")
    purchasable.id = 2
    purchasable.name = "Purchasable 1"

    my_cart = MagicMock(name="MyCart")
    my_cart.id = 1

    my_cart_item = MagicMock(name="MyCartItem")
    my_cart_item.purchasable = purchasable
    my_cart_item.qty = 99
    my_cart_item.id = 11

    my_cart_item_option = MagicMock(name="MyCartItemOption")
    my_cart_item_option.purchasable_option = purchasable_option
    my_cart_item_option.qty = 48

    my_cart.mycartitem_set = MagicMock()
    my_cart.mycartitem_set.all.return_value = [my_cart_item]
    my_cart_item.mycartitemoption_set = MagicMock()
    my_cart_item.mycartitemoption_set.all.return_value = [my_cart_item_option]

    return my_cart



@pytest.fixture
def my_cart_repr():
    return {
        "id": 1,
        "purchasables": [
            {
                "item_id": 2,
                "purchasable_id": 3,
                "name": "Purchasable 1",
                "qty": 10,
                "options": [
                    {
                        "id": 4,
                        "name": "Option 1",
                        "qty": 20,
                    }
                ]
            }
        ]
    }

@pytest.fixture
def my_cart_item_repr():
    return {
        "item_id": 2,
        "purchasable_id": 3,
        "name": "Purchasable 1",
        "qty": 10,
        "options": [
            {
                "id": 4,
                "name": "Option 1",
                "qty": 20,
            }
        ]
    }

@pytest.fixture
def MyCartService(store, my_cart):
    with patch('kiorder.api.v1.base.Store') as Store, \
            patch('kiorder.api.v1.my_cart.MyCartService') as MyCartService:
        instance = MyCartService.return_value
        instance.my_cart_of.return_value = my_cart
        instance.load.return_value = my_cart
        instance.load_item.return_value = my_cart.mycartitem_set.all().pop()

        Store.objects = MagicMock()
        Store.objects.get = MagicMock()
        Store.objects.get.return_value = store
        yield MyCartService


def test_get_my_cart(MyCartService, client, my_cart_repr):
    response = client.get('/kiorder/api/v1/my_cart/')
    assert response.status_code == 200

    assert response.json() == {
        'success': True,
        'data': {"list": my_cart_repr}
    }

def test_delete_my_cart(MyCartService, client, my_cart):
    response = client.delete('/kiorder/api/v1/my_cart/2')
    MyCartService().load_item.assert_called()
    assert response.status_code == 200
    assert response.json() == {'success': True, "data": None}


def test_patch_my_cart(MyCartService, client, my_cart, my_cart_item_repr):
    response = client.patch('/kiorder/api/v1/my_cart/2',
                            "qty=9")
    assert response.status_code == 200
    MyCartService().load_item.assert_called()
    #assert my_cart.my_cart_item.qty == 9