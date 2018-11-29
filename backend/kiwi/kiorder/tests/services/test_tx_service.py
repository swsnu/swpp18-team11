import pytest

from datetime import date
from kiorder.services.tx import TxService, OrderSpec, PurchaseMethod 
from kiorder.services.ticket import TicketService
from kiorder.models.user import User

class TestPurchaseMethod(PurchaseMethod):
    pass

TestPurchaseMethod.register_as("test")


@pytest.fixture
def tx_service():
    return TxService()

@pytest.fixture
def ticket_service():
    return TicketService()

@pytest.fixture
def purchase_method():
    return TestPurchaseMethod()


@pytest.fixture
def order_spec(store_1, purchasable_with_options_1, purchasable_2, purchasable_option_1):
    order_spec = OrderSpec(store=store_1)
    purchasable_spec = order_spec.add_purchasable(purchasable_with_options_1, 2)
    purchasable_spec.add_option(purchasable_option_1, 1)
    purchasable_spec = order_spec.add_purchasable(purchasable_2, 3)
    return order_spec 


@pytest.fixture
def utxid():
    return "TX_1111111"

@pytest.fixture
def user():
    x = User(username='swpp')
    x.save()
    return x

@pytest.mark.django_db
def test_tx_order(tx_service, ticket_service, utxid, user, order_spec, purchase_method):
    # Step 1: Prepare order
    order_tx = tx_service.prepare_order(
        utxid=utxid,
        user=user,
        order_spec=order_spec,
        part_ref="Table 1"
    )
    ## Expections
    assert order_tx.utxid == utxid
    loaded_order_tx = tx_service.load(utxid)
    assert loaded_order_tx.utxid == utxid
    assert loaded_order_tx.state == 'ready'
    assert loaded_order_tx.tx is None
    assert loaded_order_tx.purchase_method is None

    # Step 2: Start order
    tx_service.start_order(loaded_order_tx, purchase_method)

    ## Expections
    loaded_order_tx = tx_service.load(utxid)
    assert loaded_order_tx.state == 'pending'
    assert loaded_order_tx.tx is None
    assert isinstance(loaded_order_tx.purchase_method, TestPurchaseMethod)

    # Step 3: credit and finish order
    with tx_service.finish_order(loaded_order_tx) as creditor:
        value_date = date(1994, 7, 13)
        creditor.credit_order(
            amount=1000,
            name="Algy",
            ref="580-1234-567",
            bank="NHBank",
            value_date=value_date
        )

    ## Expections
    loaded_order_tx = tx_service.load(utxid)
    assert loaded_order_tx.state == 'done'
    assert loaded_order_tx.tx is not None
    assert len(loaded_order_tx.tx.txitem_set.all()) > 0
    assert loaded_order_tx._tx_log.tx

    assert loaded_order_tx.tx.txitem_set.first().purchasable == order_spec.purchasable_specs[0].purchasable
    assert loaded_order_tx.tx.txitem_set.first().qty == order_spec.purchasable_specs[0].qty

    assert loaded_order_tx.tx.txitem_set.first().txitemoption_set.first().purchasable_option == order_spec.purchasable_specs[0].purchasable_option_specs[0].purchasable_option
    assert loaded_order_tx.tx.txitem_set.first().txitemoption_set.first().qty == order_spec.purchasable_specs[0].purchasable_option_specs[0].qty

    loaded_order_tx = tx_service.load(utxid)
    credit = loaded_order_tx.tx.txcredit_set.first()
    assert int(credit.amount) == 1000
    assert credit.customer_name == "Algy"
    assert credit.customer_ref == "580-1234-567"
    assert credit.customer_bank == "NHBank"
    assert credit.value_date == value_date

    ## Ticket Expections
    tickets = ticket_service.active_tickets_in(order_spec.store)
    assert len(tickets) == 1
    assert tickets[0].state == 'todo'
    assert tickets[0].number == 1

