import { async, TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { SelectFoodComponent } from './select-food/select-food.component';
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Purchasable } from './purchasable';
import { Option } from './option';
import { of } from 'rxjs';
import {
  MatBadgeModule,
  MatButtonModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MyCartItem } from './my-cart-item';

describe('PaymentService', () => {
  let service: PaymentService;
  let http: HttpClient;

  const routes: Routes = [
    { path: '', redirectTo: '/order', pathMatch: 'full'},
    { path: 'order', component: SelectFoodComponent },
    { path: 'order/:menu_id', component: SpecifyOrderComponent },
    { path: 'mycart', component: MyCartComponent },
    { path: 'payment', component: PaymentComponent },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentComponent,
        SelectFoodComponent,
        SpecifyOrderComponent,
        MyCartComponent,
        SelectOptionComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        NgbModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatBadgeModule,
        MatButtonModule,
        MatExpansionModule,
      ]
    });
    service = TestBed.get(PaymentService);
    http = TestBed.get(HttpClient);
    spyOn(http, 'post').and.callFake(() => {
      return of({success: true, data: {utxid: '1'}});
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert mycart to order_spec', () => {
    const options: Partial<Option>[] = [{id: 1, quantity: 3}];
    const mycart: Partial<MyCartItem>[] = [{
        purchasable: new Purchasable({
          id: 1,
          quantity: 1,
          options: options as Option[]
        })}];
    const order_spec = service.convertMyCartToOrderSpec(mycart as MyCartItem[]);
    expect(order_spec).toEqual('1-1#1-3');
  });

  it('should send tx info to backend', async(() => {
    const options: Partial<Option>[] = [{id: 1, quantity: 3}];
    const mycart: Partial<MyCartItem>[] = [{
      purchasable: new Purchasable({
        id: 1,
        quantity: 1,
        options: options as Option[]
        }),
    }];
    service.notifyPaymentFinished(mycart as MyCartItem[])
      .then(res => {
        expect(res['success']).toBe(true);
        expect(res['data']['utxid']).toBe('1');
      });
  }));
});
