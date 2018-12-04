from django.http import QueryDict

from kiorder.services.ticket import TicketService

from .base import BaseResource

class BaseTicket(BaseResource):
    login_required = True

    def represent_ticket(self, ticket):
        return {
            "id": ticket.id,
            "state": ticket.state,
            "number": ticket.number,
            "created_at": ticket.created_at,
            "updated_at": ticket.updated_at,
            "purchasables": [
                {
                    "id": tx_item.purchasable.id,
                    "name": tx_item.purchasable.name,
                    "qty": tx_item.qty,
                    "options": [
                        {
                            "id": opt.purchasable_option.id,
                            "name": opt.purchasable_option.name,
                            "qty": opt.qty,
                        }
                        for opt in tx_item.txitemoption_set.all()
                    ]
                }
                for tx_item in ticket.tx.txitem_set.all()
            ]
        }

class Ticket(BaseTicket):
    def get(self, request):
        ticket_service = TicketService()
        store = self.get_current_store()
        tickets = ticket_service.active_tickets_in(store)

        return self.success({
            "list": [
                self.represent_ticket(ticket)
                for ticket in tickets
            ]
        })


class TicketDetail(BaseTicket):
    def _get_ticket(self, id):
        ticket = TicketService().load(id)
        if not ticket: self.abort(message=f"No ticket {id}", status_code=404)
        return ticket

    def get(self, request, id):
        ticket = self._get_ticket(id)
        return self.success(self.represent_ticket(ticket))

    def delete(self, request, id):
        ticket_service = TicketService()
        ticket = self._get_ticket(id)
        ticket_service.remove_ticket(ticket)
        return self.success()

    def patch(self, request, id):
        data = QueryDict(request.body)
        state = data['state']

        ticket_service = TicketService()
        ticket = self._get_ticket(id)
        ticket.state = state

        ticket_service.save_ticket(ticket)
        return self.success(self.represent_ticket(ticket))


