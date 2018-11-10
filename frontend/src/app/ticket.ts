export type TicketState = 'todo' | 'doing' | 'done';

class TicketPurchasableOption {
  id: number;
  name: string;
  qty: number;

  constructor(args: { id: number, name: string, qty: number }) {
    this.id = args.id;
    this.name = args.name;
    this.qty = args.qty;
  }
}

class TicketPurchasable {
  id: number;
  name: string;
  qty: number;
  options: TicketPurchasableOption[];

  constructor(args: {
    id: number,
    name: string,
    qty: number,
    options: TicketPurchasableOption[]
  }) {
    this.id = args.id;
    this.name = args.name;
    this.qty = args.qty;
    this.options = args.options;
  }
}

class Ticket {
  id: number;
  state: TicketState;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  purchasables: TicketPurchasable[];

  constructor(args: {
    id: number,
    state: TicketState,
    number: number,
    createdAt: Date,
    updatedAt: Date,
    purchasables: TicketPurchasable[]
  }) {
    this.id = args.id;
    this.state = args.state;
    this.number = args.number;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.purchasables = args.purchasables;
  }

  setState(state: TicketState): Ticket {
    this.state = state;
    return this;
  }
}

export { Ticket, TicketPurchasable, TicketPurchasableOption };
