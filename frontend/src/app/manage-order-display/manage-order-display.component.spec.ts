import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ticket } from '../ticket';
import { TtsService } from '../tts.service';
import { TicketChange, TicketArrived } from '../ticket-change';
import { ManageOrderStateService } from '../manage-order-state.service';
import { ReplaySubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManageOrderDisplayComponent } from './manage-order-display.component';

describe('ManageOrderDisplayComponent', () => {
  let component: ManageOrderDisplayComponent;
  let fixture: ComponentFixture<ManageOrderDisplayComponent>;
  let manageOrderStateService: any;

  beforeEach(async(() => {
    manageOrderStateService = {
      tickets$: new ReplaySubject<Ticket[]>(1),
      ticketChanges$: new ReplaySubject<TicketChange>(2),
    };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ManageOrderStateService, useValue: manageOrderStateService },
        { provide: TtsService, useValue: { playTTS: () => null } },
      ],
      declarations: [ ManageOrderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('can show done and doing tickets', async(() => {
    const tickets = [
      new Ticket({
        id: 1,
        state: 'done',
        number: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
        purchasables: [],
      }),
      new Ticket({
        id: 3,
        state: 'doing',
        number: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
        purchasables: [],
      }),
    ];

    const ticketChanges = tickets.map(ticket => new TicketArrived(ticket, new Date()));
    manageOrderStateService.tickets$.next(tickets);
    ticketChanges.forEach(c => manageOrderStateService.ticketChanges$.next(c));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector("ul.done-ticket > li").textContent.trim()).toEqual("9");
      expect(fixture.nativeElement.querySelector("ul.doing-ticket > li").textContent.trim()).toEqual("99");
    });
  }));
});
