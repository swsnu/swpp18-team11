import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageOrderService } from '../manage-order.service';
import { ManageOrderStateService } from '../manage-order-state.service';

import { Ticket } from '../ticket';
import { TicketChange } from '../ticket-change';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageOrderComponent implements OnInit, OnDestroy {
  public tickets$: Observable<Ticket[]>;
  public doneTickets$: Observable<Ticket[]>;
  public notDoneTickets$: Observable<Ticket[]>;
  public notDoneTicketsCount$: Observable<number>;
    constructor(private manageOrderStateService: ManageOrderStateService, private manageOrderService: ManageOrderService) { }

  ngOnInit() {
    this.tickets$ = this.manageOrderStateService.tickets$;
    this.doneTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(x => x.state === 'done')));
    this.notDoneTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(x => x.state !== 'done')));
    this.notDoneTicketsCount$ = this.notDoneTickets$.pipe(map(tickets => tickets.length));
  }

  ngOnDestroy() {
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

  handleDragDrop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
    } else if (event.item.data.state === 'done') {
      this.handleMoveToDoing(event.item.data);
    } else { // event.ite.data.state === 'tod o' or 'done'
      this.handleMoveToDone(event.item.data);
    }
  }
}
