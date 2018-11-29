import pytest

from kiorder.services.my_cart import MyCartService
from kiorder.services.tx import OrderSpec


@pytest.fixture
def order_spec(store_1, purchasable_with_options_1, purchasable_2, purchasable_option_1):
    order_spec = OrderSpec(store=store_1)
    purchasable_spec = order_spec.add_purchasable(purchasable_with_options_1, 2)
    purchasable_spec.add_option(purchasable_option_1, 1)
    purchasable_spec = order_spec.add_purchasable(purchasable_2, 3)
    return order_spec

@pytest.mark.django_db
def test_my_cart_of(store_1, user_1, my_cart_1):
    assert MyCartService().get_my_cart_of(store_1, user_1) == my_cart_1


@pytest.mark.django_db
def test_my_cart_load(my_cart_1):
    assert MyCartService().load(my_cart_1.id) == my_cart_1


@pytest.mark.django_db
def test_my_cart_load_item(my_cart_item_1):
    assert MyCartService().load_item(my_cart_item_1.id) == my_cart_item_1


@pytest.mark.django_db
def test_save_item(my_cart_item_1):
    my_cart_item_1.qty = 999
    MyCartService().save_item(my_cart_item_1)
    assert MyCartService().load_item(my_cart_item_1.id).qty == 999


@pytest.mark.django_db
def test_save_item_option(my_cart_item_option_1, my_cart_item_2):
    my_cart_item_option_1.my_cart_item = my_cart_item_2
    MyCartService().save_item_option(my_cart_item_option_1)
    assert MyCartService().load_item(my_cart_item_option_1.my_cart_item.id) == \
        my_cart_item_option_1.my_cart_item


@pytest.mark.django_db
def test_delete_item(my_cart_1, my_cart_item_1):
    previous = my_cart_1.mycartitem_set.count()
    MyCartService().delete_item(my_cart_1.mycartitem_set.all().first())
    after = my_cart_1.mycartitem_set.count()
    assert after == previous - 1


@pytest.mark.django_db
def test_create_item_by_order_spec(my_cart_2, order_spec):
    # order_spec has two purchasable
    assert my_cart_2.mycartitem_set.count() == 0
    MyCartService().create_item_by_order_spec(my_cart_2, order_spec)
    assert my_cart_2.mycartitem_set.count() == 2


@pytest.mark.django_db
def test_create_item_option(my_cart_item_2, purchasable_option_1):
    # my_cart_item_2 has no option
    assert my_cart_item_2.mycartitemoption_set.count() == 0
    created_option = MyCartService().create_item_option(my_cart_item_2, purchasable_option_1, 2)
    assert my_cart_item_2.mycartitemoption_set.count() == 1
    assert created_option.purchasable_option == purchasable_option_1


@pytest.mark.django_db
def test_patch_item(my_cart_item_1, my_cart_item_2, my_cart_item_option_1, purchasable_option_1):
    option_id = my_cart_item_option_1.purchasable_option.id
    # case1: qty adjust
    MyCartService().patch_item(my_cart_item_1, qty=99)
    assert my_cart_item_1.qty == 99
    # case2: option qty adjust
    option_spec = f"{option_id}-9"
    MyCartService().patch_item(my_cart_item_1, option_spec_line=option_spec)
    assert my_cart_item_1.mycartitemoption_set.all().first().qty == 9
    # case3: option delete
    option_spec = f"{option_id}-0"
    assert my_cart_item_1.mycartitemoption_set.count() == 1
    MyCartService().patch_item(my_cart_item_1, option_spec_line=option_spec)
    assert my_cart_item_1.mycartitemoption_set.count() == 0
    # case4: option create fail (qty 0)
    option_spec = f"{option_id}-0"
    assert my_cart_item_2.mycartitemoption_set.count() == 0
    MyCartService().patch_item(my_cart_item_2, option_spec_line=option_spec)
    assert my_cart_item_2.mycartitemoption_set.count() == 0
    # case5: option create
    option_spec = f"{option_id}-1"
    assert my_cart_item_2.mycartitemoption_set.count() == 0
    MyCartService().patch_item(my_cart_item_2, option_spec_line=option_spec)
    assert my_cart_item_2.mycartitemoption_set.count() == 1



