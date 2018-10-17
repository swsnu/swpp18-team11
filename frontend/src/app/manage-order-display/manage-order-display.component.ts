import { Component, OnInit } from '@angular/core';
import { ManageOrderStateService } from '../manage-order-state.service';
import { Ticket } from '../ticket';
import { TicketChange } from '../ticket-change';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-order-display',
  templateUrl: './manage-order-display.component.html',
  styleUrls: ['./manage-order-display.component.css']
})
export class ManageOrderDisplayComponent implements OnInit {
  public doneTickets$: Observable<Ticket[]>
  public doingTickets$: Observable<Ticket[]>
  public ticketChanges$: Observable<TicketChange>

  constructor(private manageOrderStateService: ManageOrderStateService) { }

  ngOnInit() {
    const tickets$ = this.manageOrderStateService.tickets$;
    this.doingTickets$ = tickets$.pipe(map(tickets => tickets.filter(x => x.state === 'doing')))
    this.doneTickets$ = tickets$.pipe(map(tickets => tickets.filter(x => x.state === 'done')))
    this.ticketChanges$ = this.manageOrderStateService.ticketChanges$
  }
}
