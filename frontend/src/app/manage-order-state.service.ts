import { Injectable } from '@angular/core';
import { ManageOrderService } from './manage-order.service';
import { timer, Observable, from, Subject } from 'rxjs';
import { map, publish, refCount, tap, merge, concatMap, pairwise, share } from 'rxjs/operators';
import { Ticket } from './ticket';
import { TicketChange, TicketArrived, TicketModified, TicketRemoved } from './ticket-change';

import differenceBy from 'lodash/differenceBy';
import intersection from 'lodash/intersection';
import sortBy from 'lodash/sortBy';


@Injectable({
  providedIn: 'root'
})
export class ManageOrderStateService {
  private updateTrigger$: Subject<any> = new Subject();
  private timer$: Observable<any> = timer(0, 1000);
  private ticker$: Observable<any> = this.timer$.pipe(merge(this.updateTrigger$), publish(), refCount());
  public tickets$: Observable<Ticket[]>;
  public ticketChanges$: Observable<TicketChange>;

  constructor(private manageOrderService: ManageOrderService) {
    this.tickets$ = this.ticker$.pipe(
      concatMap(_ => this.manageOrderService.list()),
      share(),
    )
    this.ticketChanges$ = this.tickets$.pipe(
      pairwise(),
      concatMap(([oldTickets, newTickets]) => this.diff(oldTickets, newTickets)),
      share(),
    )
  }

  forceRefresh() {
    this.updateTrigger$.next(null);
  }

  private diff(oldTickets: Ticket[], newTickets: Ticket[]): Observable<TicketChange> {
    const oldById = {}, newById = {}
    oldTickets.forEach(x => oldById[x.id] = x)
    newTickets.forEach(x => newById[x.id] = x)

    const removedTickets = differenceBy(oldTickets, newTickets, 'id')
    const arrivedTickets = differenceBy(newTickets, oldTickets, 'id')

    const commonIds = intersection(oldTickets.map(x => x.id), newTickets.map(x => x.id))
    const modifiedIds = commonIds.filter(id => oldById[id].updatedAt < newById[id].updatedAt)

    const result: TicketChange[] = []

    removedTickets.forEach(ticket => result.push(new TicketRemoved(ticket, ticket.updatedAt)))
    arrivedTickets.forEach(ticket => result.push(new TicketArrived(ticket, ticket.updatedAt)))
    modifiedIds.forEach(id => result.push(new TicketModified(newById[id], newById[id].updatedAt, oldById[id])))

    // sort by the event time when they occurred
    sortBy(result, ['occurredAt']);
    return from(result);
  }
}
