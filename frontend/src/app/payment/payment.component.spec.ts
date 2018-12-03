import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DEFAULT_IMPORTS } from '../testing';
import { Routes } from '@angular/router';
import { SelectFoodComponent } from '../select-food/select-food.component';
import { SpecifyOrderComponent } from '../specify-order/specify-order.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { PaymentService } from '../payment.service';
import { Purchasable } from '../purchasable';
import { Option } from '../option';
import { MyCartService } from '../my-cart.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { MyCartItem } from '../my-cart-item';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let myCart = [new MyCartItem({
    myCartItemId: 1,
    purchasable: new Purchasable({
      id: 1,
      name: 'pur',
      thumbnail: '',
      base_price: 1000,
      quantity: 1,
      total_price: 1000,
      options: [new Option({
        id: 1,
        name: 'ASDF',
        base_price: 50,
        max_capacity: 2,
        quantity: 2,
        total_price: 100,
      } as any),
      ],
      badges: []
    })
  })];
  const myCart$ = of(myCart);
  const myCartServiceSpy = jasmine.createSpyObj('MyCarttService',
    ['getMyCart', 'getTotalPrice', 'emptyMyCart']);
  myCartServiceSpy.getMyCart.and.callFake(() => myCart$);
  myCartServiceSpy.getTotalPrice.and.callFake(() => of(1000).toPromise());

  myCartServiceSpy.emptyMyCart.and.callFake(() => {
    myCart = [];
  });
  const paymentServiceSpy = jasmine.createSpyObj('PaymentService',
    ['convertMyCartToOrderSpec', 'notifyPaymentFinished']);
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
        SelectOptionComponent,
      ],
      imports: [
        ...DEFAULT_IMPORTS,
        RouterTestingModule.withRoutes(routes),
        NgbModule
      ],
      providers: [
        {provide: MyCartService, useValue: myCartServiceSpy},
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
    // expect(paymentServiceSpy.notifyPaymentFinished).toHaveBeenCalled();
    // expect(paymentServiceSpy.convertMyCartToOrderSpec).toHaveBeenCalled();
    expect(component.status.confirmedBuyList).toBe(false);
    expect(component.status.paymentMethodChosen).toBe(false);
  });

  it('should clean up', () => {
    component.cleanUp();
    expect(component.status.confirmedBuyList).toBe(false);
    expect(component.status.paymentMethodChosen).toBe(false);
  });
});
