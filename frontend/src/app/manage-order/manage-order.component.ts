import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageOrderStateService } from '../manage-order-state.service';

import { Ticket } from '../ticket';
import { TicketChange } from '../ticket-change';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  public tickets$: Observable<Ticket[]>
  public ticketChanges$: Observable<TicketChange>

  constructor(private manageOrderStateService: ManageOrderStateService) { }

  ngOnInit() {
    this.tickets$ = this.manageOrderStateService.tickets$;
    this.ticketChanges$ = this.manageOrderStateService.ticketChanges$
  }
}
