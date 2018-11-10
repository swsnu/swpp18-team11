import { TestBed } from '@angular/core/testing';

import { ManageOrderService } from './manage-order.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Ticket } from './ticket';

describe('ManageOrderService', () => {
  let httpClientSpy: any;
  const purchsable = {
    id: 1,
    name: 'F',
    qty: 2,
    options: []
  };
  const data = {
    id: 1,
    state: 'todo',
    number: 1,
    created_at: '2018-01-01T00:00:00Z',
    updated_at: '2018-01-01T00:00:00Z',
    purchasables: [ purchsable ]
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of({ success: true, data: { list: [data] }}),
      delete: of(null),
      patch: of({ success: true, data }),
    });
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ { provide: HttpClient, useValue: httpClientSpy } ]
  }));

  it('should be created', () => {
    const service: ManageOrderService = TestBed.get(ManageOrderService);
    expect(service).toBeTruthy();
  });

  it('should list', () => {
    const service: ManageOrderService = TestBed.get(ManageOrderService);
    return service.list().toPromise()
      .then((tickets: Ticket[]) => {
        expect(tickets.every(x => x instanceof Ticket)).toBeTruthy();
        expect(tickets.length).toEqual(1);
        expect(tickets[0].id).toEqual(1);
      });
  });

  it('should patchState', () => {
    const service: ManageOrderService = TestBed.get(ManageOrderService);
    return service.list().toPromise()
      .then((tickets: Ticket[]) => tickets[0])
      .then((ticket: Ticket) => service.patchState(ticket, 'done').toPromise())
      .then(() => {
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });
  });

  it('should deleteTicket', () => {
    const service: ManageOrderService = TestBed.get(ManageOrderService);
    return service.list().toPromise()
      .then((tickets: Ticket[]) => tickets[0])
      .then((ticket: Ticket) => service.deleteTicket(ticket).toPromise())
      .then(() => {
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });
  });
});
