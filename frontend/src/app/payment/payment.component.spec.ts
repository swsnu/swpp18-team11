import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Routes} from '@angular/router';
import {SelectFoodComponent} from '../select-food/select-food.component';
import {SpecifyOrderComponent} from '../specify-order/specify-order.component';
import {MyCartComponent} from '../my-cart/my-cart.component';
import {SelectOptionComponent} from '../select-option/select-option.component';
import {PaymentService} from '../payment.service';
import {Purchasable} from '../purchasable';

fdescribe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let buyList = [{total_price: 1000} as Purchasable];
  const paymentServiceSpy = jasmine.createSpyObj('PaymentService', ['getBuyList', 'notifyPaymentFinished', 'emptyBuyList']);
  paymentServiceSpy.getBuyList.and.callFake(() => buyList)
  paymentServiceSpy.notifyPaymentFinished.and.callFake(() => {return});
  paymentServiceSpy.emptyBuyList.and.callFake(() => {
    buyList = [];
  })

  const routes: Routes = [
    { path: '', redirectTo: '/order', pathMatch: 'full'},
    { path: 'order', component: SelectFoodComponent },
    { path: 'order/:menu_id', component: SpecifyOrderComponent },
    { path: 'mycart', component: MyCartComponent },
    { path: 'payment', component: PaymentComponent },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentComponent,
        SelectFoodComponent,
        SpecifyOrderComponent,
        MyCartComponent,
        SelectOptionComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {provide: PaymentService, useValue: paymentServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm buy-list', () => {
    component.confirmBuyList();
    expect(component.status.confirmedBuyList).toBe(true);
  });

  it('should confirm payment method', () => {
    component.confirmPaymentMethod();
    expect(component.status.paymentMethodChosen).toBe(true);
  });

  it('should confirm', () => {
    expect(component.status.confirmedBuyList).toBe(false);
    expect(component.status.paymentMethodChosen).toBe(false);
    component.confirm();
    expect(component.status.confirmedBuyList).toBe(true);
    component.confirm();
    expect(component.status.paymentMethodChosen).toBe(true);
    component.confirm();
    expect(component.status.confirmedBuyList).toBe(false);
    expect(component.status.paymentMethodChosen).toBe(false);
  });

  it('should clean up', () => {
    component.cleanUp();
    expect(component.buyList).toEqual([]);
    expect(component.status.confirmedBuyList).toBe(false);
    expect(component.status.paymentMethodChosen).toBe(false);
  });
});
