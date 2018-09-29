import pytz

from datetime import datetime
from dataclasses import dataclass, field

from .store import StoreService
from ..models import Store, Ticket

from typing import List, Optional

@dataclass
class TicketService:
    store_service: StoreService = field(default_factory=StoreService)
    def convert_order_tx(self, order_tx, store: Store) -> Ticket:
        tx = order_tx.tx
        number = self.store_service.pop_ticket_number(store)
        ticket = Ticket(
            state="todo",
            number=number,
            tx=tx,
            store=store,
            denorm_data="",
        )
        ticket.save()
        return ticket

    def load(self, id) -> Optional[Ticket]:
        return Ticket.objects.filter(id=id).first()

    def save_ticket(self, ticket: Ticket):
        ticket.save()

    def ticket_of_tx(self, utxid) -> Optional[Ticket]:
        return Ticket.objects.filter(tx__utxid=utxid, removed=False).first()

    def active_tickets_in(self, store: Store, state: Optional[str] = None) -> List[Ticket]:
        query = Ticket.objects.filter(store=store, removed=False)
        if state is not None:
            query = query.filter(state=state)
        tickets = list(query.all())
        return tickets

    def remove_ticket(self, ticket: Ticket):
        ticket.removed = True
        ticket.save()
