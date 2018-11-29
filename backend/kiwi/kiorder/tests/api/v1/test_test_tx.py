import pytest

from unittest.mock import patch, MagicMock, call
from kiorder.services.tx import OrderSpec, PurchaseMethod



@pytest.fixture
def Store(store):
    with patch('kiorder.api.v1.base.Store') as Store:
        Store.objects = MagicMock()
        Store.objects.get = MagicMock()
        Store.objects.get.return_value = store
        yield Store


@pytest.mark.django_db(transaction=True)
def test_create_new_tx(Store, client):
    purchsable = MagicMock(name="Purchsable")
    purchsable_option = MagicMock(name="PurchsableOption")

    with patch('kiorder.api.v1.test_tx.TxService') as TxService, \
            patch('kiorder.api.v1.test_tx.Purchasable') as Purchasable, \
            patch('kiorder.api.v1.test_tx.PurchasableOption') as PurchasableOption:
        Purchasable.objects.get.return_value = purchsable
        PurchasableOption.get.return_value = purchsable_option

        order_spec_line = '1-1#1-2#3-4 2-1'

        response = client.post('/kiorder/api/v1/test_tx', {"order_spec": order_spec_line})
        assert response.status_code == 200

        TxService().parse_order_spec_line.assert_called()
        TxService().prepare_order.assert_called()
        TxService().start_order.assert_called()


@pytest.mark.django_db(transaction=True)
def test_create_finish_tx(Store, client):
    order_tx = MagicMock(name="OrderTx")

    with patch('kiorder.api.v1.test_tx.TxService') as TxService:
        TxService().load.return_value = order_tx
        response = client.post('/kiorder/api/v1/test_tx/UTXID/finish')
        assert response.status_code == 200

        TxService().load.assert_called_with("UTXID")
        TxService().finish_order.assert_called_with(order_tx)




@pytest.mark.django_db(transaction=True)
def test_create_finish_tx_not_found(Store, client):
    order_tx = MagicMock(name="OrderTx")
    with patch('kiorder.api.v1.test_tx.TxService') as TxService:
        TxService().load.return_value = None

        response = client.post('/kiorder/api/v1/test_tx/UTXID/finish')
        assert response.status_code == 404

