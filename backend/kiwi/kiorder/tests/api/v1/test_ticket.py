import pytest
import json

from datetime import datetime
from unittest.mock import patch, MagicMock
from django.core.serializers.json import DjangoJSONEncoder

@pytest.fixture
def now():
    return datetime.now()

@pytest.fixture
def ticket(now):
    purchasable_option = MagicMock(name="PurchsableOption")
    purchasable_option.id = 3
    purchasable_option.name = 'Purchasable Option 1'

    purchasable = MagicMock("Purchasable")
    purchasable.id = 2
    purchasable.name = "Purchasable 1"

    tx_item_option = MagicMock(name="TxItemOption")
    tx_item_option.purchasable_option = purchasable_option
    tx_item_option.qty = 48

    tx_item = MagicMock(name="TxItem")
    tx_item.purchasable = purchasable
    tx_item.qty = 99
    tx_item.txitemoption_set = MagicMock()
    tx_item.txitemoption_set.all.return_value = [tx_item_option] 
    ticket = MagicMock(name="Ticket")
    ticket.id = 1
    ticket.state = "todo"
    ticket.number = 1
    ticket.created_at = ticket.updated_at = now

    ticket.tx = MagicMock()
    ticket.tx.txitem_set = MagicMock()
    ticket.tx.txitem_set.all.return_value = [tx_item]

    return ticket


@pytest.fixture
def ticket_repr(now):
    now_str = json.loads(DjangoJSONEncoder().encode(now))
    return {
        'id': 1,
        'state': 'todo',
        'number': 1,
        'created_at': now_str,
        'updated_at': now_str,
        'purchasables': [
            {
                'id': 2,
                'name': 'Purchasable 1',
                'qty': 99,
                'options': [
                    {
                        'id': 3,
                        'name': 'Purchasable Option 1',
                        'qty': 48
                    }
                ]
            }
        ]
    }

@pytest.fixture
def TicketService(store, ticket):
    with patch('kiorder.api.v1.base.Store') as Store, \
            patch('kiorder.api.v1.ticket.TicketService') as TicketService:
        instance = TicketService.return_value
        instance.active_tickets_in.return_value = [ticket]
        instance.load.return_value = ticket
        
        Store.objects = MagicMock()
        Store.objects.get = MagicMock()
        Store.objects.get.return_value = store
        yield TicketService


def test_get_tickets(TicketService, client, ticket_repr):
    response = client.get('/kiorder/api/v1/ticket')
    assert response.status_code == 200

    assert response.json() == {
        'success': True,
        'data': {'list': [ticket_repr]}
    }


def test_get_specific_ticket(TicketService, client, ticket_repr):
    response = client.get('/kiorder/api/v1/ticket/42')
    assert response.status_code == 200
    assert response.json() == {
        'success': True,
        'data': ticket_repr,
    }
    TicketService().load.assert_called_with(42)


def test_delete_ticket(TicketService, client, ticket, ticket_repr):
    response = client.delete('/kiorder/api/v1/ticket/42')
    assert response.status_code == 200
    assert response.json() == {'success': True, "data": None}
    TicketService().load.assert_called_with(42)
    TicketService().remove_ticket.assert_called_with(ticket)


def test_patch_ticket(TicketService, client, ticket, ticket_repr):
    response = client.patch('/kiorder/api/v1/ticket/42', "state=doing")
    assert response.status_code == 200

    TicketService().load.assert_called_with(42)
    assert ticket.state == 'doing'
    TicketService().save_ticket.assert_called_with(ticket)

