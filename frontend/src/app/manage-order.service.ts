import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ticket, TicketPurchasable, TicketPurchasableOption } from './ticket';
import { TicketState } from './ticket';
import sortBy from 'lodash/sortBy';


@Injectable({
  providedIn: 'root'
})
export class ManageOrderService {
  constructor(private http: HttpClient) { }

  list(): Observable<Ticket[]> {
    return this.http.get('/kiorder/api/v1/ticket')
    .pipe(map((x: any) => {
      const tickets = x.data.list.map(elem => this.loadTicket(elem));
      sortBy(tickets, 'updatedAt');
      return tickets;
    }));
  }

  patchState(ticket: Ticket, state: TicketState): Observable<Ticket> {
    ticket.setState(state);

    const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'})};
    const formData = `state=${ticket.state}`;

    return this.http.patch(`/kiorder/api/v1/ticket/${ticket.id}`, formData, httpOptions).pipe(map((x: any) => this.loadTicket(x.data)));
  }

  deleteTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.delete(`/kiorder/api/v1/ticket/${ticket.id}`).pipe(map(() => ticket));
  }

  private loadTicket(opt: any): Ticket {
    return new Ticket({
      id: opt.id,
      state: opt.state,
      number: opt.number,
      createdAt: new Date(opt.created_at),
      updatedAt: new Date(opt.updated_at),
      purchasables: opt.purchasables.map(x => this.loadTicketPurchasable(x)),
    });
  }

  private loadTicketPurchasable(opt: any): TicketPurchasable {
    return new TicketPurchasable({
      id: opt.id,
      name: opt.name,
      qty: opt.qty,
      options: opt.options.map(x => this.loadTicketPurchasableOption(x)),
    });
  }

  private loadTicketPurchasableOption(opt: any): TicketPurchasableOption {
    return new TicketPurchasableOption(opt);
  }
}
