import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderComponent } from './manage-order.component';
import { ManageOrderService } from '../manage-order.service';
import { ManageOrderStateService } from '../manage-order-state.service';
import { DEFAULT_IMPORTS } from '../testing';

import { Ticket } from '../ticket';
import { TicketChange } from '../ticket-change';
import { ReplaySubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CdkDrag, CdkDragDrop, CdkDropListContainer, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';


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

describe('ManageOrderComponent', () => {
  let component: ManageOrderComponent;
  let fixture: ComponentFixture<ManageOrderComponent>;
  let manageOrderStateService: any;
  let manageOrderService: any;

  beforeEach(() => {
    manageOrderStateService = jasmine.createSpyObj('manageOrderStateService', ['forceRefresh']);
    manageOrderStateService.tickets$ = new ReplaySubject<Ticket[]>(1);
    manageOrderStateService.tickets$.next(tickets);

    manageOrderService = jasmine.createSpyObj('manageOrderService', [
      'patchState',
      'deleteTicket',
    ]);
    manageOrderService.patchState.and.returnValue(of(null));
    manageOrderService.deleteTicket.and.returnValue(of(null));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...DEFAULT_IMPORTS,
        DragDropModule,
        MatCardModule,
      ],
      providers: [
        { provide: ManageOrderService, useValue: manageOrderService },
        { provide: ManageOrderStateService, useValue: manageOrderStateService },
      ],
      declarations: [ ManageOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can handleNotDoneClick', async(() => {
    const ticket = tickets[1];
    fixture.componentInstance.handleNotDoneClick(ticket);
    fixture.whenStable().then(() => {
      expect(manageOrderService.patchState).toHaveBeenCalledWith(ticket, 'todo');
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));

  it('can execute handleDoneClick', async(() => {
    const ticket = tickets[0];
    fixture.componentInstance.handleDoneClick(ticket);
    fixture.whenStable().then(() => {
      expect(manageOrderService.patchState).toHaveBeenCalledWith(ticket, 'done');
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));

  it('can execute handleMoveToDoing', async(() => {
    const ticket = tickets[0];
    fixture.componentInstance.handleMoveToDoing(ticket);
    fixture.whenStable().then(() => {
      expect(manageOrderService.patchState).toHaveBeenCalledWith(ticket, 'doing');
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));

  it('can execute handleDelete', async(() => {
    const ticket = tickets[0];
    fixture.componentInstance.handleDelete(ticket);
    fixture.whenStable().then(() => {
      expect(manageOrderService.deleteTicket).toHaveBeenCalledWith(ticket);
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));

  it('can execute handleMoveToDone', async(() => {
    const ticket = tickets[1];
    fixture.componentInstance.handleMoveToDone(ticket);
    fixture.whenStable().then(() => {
      expect(manageOrderService.patchState).toHaveBeenCalledWith(ticket, 'done');
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));
  /* TODO: write test code for CdkDragDrop

describe('can execute handleDragDrop', () => {

  let dropEvent: CdkDragDrop<Ticket[]>;
  const container: CdkDropListContainer<Ticket[]>;
  const prevContainer: CdkDropListContainer<Ticket[]>;

  beforeEach(async(() => {
    dropEvent = {
      previousIndex: 0,
      currentIndex: 1,
      item: TestBed.get(CdkDrag),
      previousContainer: prevContainer,
      container: container
    };
  }));

  it('when dropped in same container', async(() => {
    dropEvent.container = prevContainer;
    fixture.componentInstance.handleDragDrop(dropEvent);
    // nothing happens
  }));

  it('when dropped tp done container', async(()=>{
    const ticket = tickets[1];  // doing_ticket
    dropEvent.item.data = ticket;
    fixture.componentInstance.handleDragDrop(dropEvent);
    // called handleMoveToDone;
    fixture.whenStable().then(() => {
      expect(manageOrderService.patchState).toHaveBeenCalledWith(ticket, 'done');
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));

  it('when dropped to to do container', async(()=>{
    const ticket = tickets[0];
    dropEvent.item.data = ticket;
    fixture.componentInstance.handleDragDrop(dropEvent);
    fixture.whenStable().then(() => {
      expect(manageOrderService.patchState).toHaveBeenCalledWith(ticket, 'doing');
      expect(manageOrderStateService.forceRefresh).toHaveBeenCalled();
    });
  }));
  });
    */
});
