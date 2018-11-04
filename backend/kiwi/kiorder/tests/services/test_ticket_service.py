import pytest

from kiorder.services.ticket import TicketService
from kiorder.models import Ticket


@pytest.mark.django_db
def test_load(ticket_1):
    assert TicketService().load(ticket_1.id) == ticket_1

@pytest.mark.django_db
def test_save_ticket(ticket_1):
    ticket_1.state = 'done'
    TicketService().save_ticket(ticket_1)
    assert TicketService().load(ticket_1.id).state == 'done'


@pytest.mark.django_db
def test_ticket_of_tx(ticket_1):
    assert TicketService().ticket_of_tx(ticket_1.tx.utxid).id == ticket_1.id



@pytest.mark.django_db
def test_active_tickets_in(ticket_1):
    assert len(TicketService().active_tickets_in(store=ticket_1.store)) == 1
    assert len(TicketService().active_tickets_in(store=ticket_1.store, state='todo')) == 1
    assert len(TicketService().active_tickets_in(store=ticket_1.store, state='done')) == 0




@pytest.mark.django_db
def test_remove_ticket(ticket_1):
    TicketService().remove_ticket(ticket_1)
    assert ticket_1.removed
