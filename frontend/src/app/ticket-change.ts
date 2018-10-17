import { Ticket } from './ticket';

class TicketChange {
  constructor(public ticket: Ticket, public occurredAt: Date) { }
  get typeName(): string { return this.constructor.name; }
}

class TicketArrived extends TicketChange { }

class TicketRemoved extends TicketChange { }

class TicketModified extends TicketChange {
  constructor(ticket: Ticket, occurredAt: Date, public oldTicket: Ticket) {
    super(ticket, occurredAt);
  }
}


export { TicketChange, TicketArrived, TicketModified, TicketRemoved };
