import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageOrderService } from '../manage-order.service';
import { ManageOrderStateService } from '../manage-order-state.service';

import { Ticket } from '../ticket';
import { TicketChange } from '../ticket-change';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  public tickets$: Observable<Ticket[]>;
  public doneTickets$: Observable<Ticket[]>;
  public notDoneTickets$: Observable<Ticket[]>;

    constructor(private manageOrderStateService: ManageOrderStateService, private manageOrderService: ManageOrderService) { }

  ngOnInit() {
    this.tickets$ = this.manageOrderStateService.tickets$;
    this.doneTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(x => x.state === 'done')));
    this.notDoneTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(x => x.state !== 'done')));
  }

  handleNotDoneClick(ticket: Ticket) {
    this.manageOrderService.patchState(ticket, ticket.state === 'todo' ? 'doing' : 'todo')
      .toPromise()
      .then(() => this.manageOrderStateService.forceRefresh());

  }

  handleDoneClick(ticket: Ticket) {
    this.manageOrderService.patchState(ticket, ticket.state).toPromise().then(() => this.manageOrderStateService.forceRefresh());
  }

  handleMoveToDoing(ticket: Ticket) {
    this.manageOrderService.patchState(ticket, 'doing').toPromise().then(() => this.manageOrderStateService.forceRefresh());
  }

  handleDelete(ticket: Ticket) {
    this.manageOrderService.deleteTicket(ticket).toPromise().then(() => this.manageOrderStateService.forceRefresh());
  }

  handleMoveToDone(ticket: Ticket) {
    this.manageOrderService.patchState(ticket, 'done').toPromise()
      .then(() => this.manageOrderStateService.forceRefresh());
  }
}
