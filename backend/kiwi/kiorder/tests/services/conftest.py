import pytest

from datetime import datetime
from kiorder.models import Purchasable, PurchasableOption, Store, Franchise, Tx, Ticket, User, MyCart, MyCartItem, MyCartItemOption
from django.contrib.gis.geos import Point

@pytest.fixture
def now():
    return datetime.now()

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
def purchasable_with_options_1(purchasable_option_1, purchasable_option_2):
    x = Purchasable(name="Purchasable With options 1", base_price=10000)
    x.save()
    x.purchasable_options.add(purchasable_option_1)
    x.purchasable_options.add(purchasable_option_2)
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

@pytest.fixture
def user_1():
    x = User(username='swppswpp', password='pw')
    x.save()
    return x

@pytest.fixture
def tx_1(store_1, user_1, now):
    tx = Tx(
        utxid="TXUID_1",
        user=user_1,
        store=store_1,
        purchase_type="test",
        purchase_data="{}",
        total_price=999.99,
        extra_props='{}',
        part_ref="",
        created_at=now,
        updated_at=now,
    )
    tx.save()
    return tx

@pytest.fixture
def ticket_1(tx_1, store_1):
    ticket = Ticket(
        state="todo",
        number=1,
        tx=tx_1,
        store=store_1,
        denorm_data="",
    )
    ticket.save()
    return ticket

@pytest.fixture
def my_cart_1(store_1, user_1):
    my_cart = MyCart(
        store = store_1,
        user = user_1
    )
    my_cart.save()
    return my_cart

@pytest.fixture
def my_cart_2(store_1, user_1):
    my_cart = MyCart(
        store = store_1,
        user = user_1
    )
    my_cart.save()
    return my_cart

@pytest.fixture
def my_cart_item_1(my_cart_1, purchasable_1):
    my_cart_item = MyCartItem(
        my_cart = my_cart_1,
        purchasable = purchasable_1,
        qty = 1
    )
    my_cart_item.save()
    return my_cart_item

@pytest.fixture
def my_cart_item_2(my_cart_1, purchasable_1):
    my_cart_item = MyCartItem(
        my_cart = my_cart_1,
        purchasable = purchasable_1,
        qty = 2
    )
    my_cart_item.save()
    return my_cart_item

@pytest.fixture
def my_cart_item_option_1(my_cart_item_1, purchasable_option_1):
    my_cart_item_option = MyCartItemOption(
        my_cart_item = my_cart_item_1,
        purchasable_option = purchasable_option_1,
        qty = 1
    )
    my_cart_item_option.save()
    return my_cart_item_option

