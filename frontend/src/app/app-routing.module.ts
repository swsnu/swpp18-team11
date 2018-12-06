import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SelectFoodComponent } from './select-food/select-food.component';
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderDisplayComponent } from './manage-order-display/manage-order-display.component';
import { SelectStoreComponent } from './select-store/select-store.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: SelectStoreComponent },
  { path: 'order', component: SelectFoodComponent },
  { path: 'order/:menu_id', component: SpecifyOrderComponent },
  { path: 'mycart', component: MyCartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'my-order', component: MyOrderComponent },
  { path: 'manage/order', component: ManageOrderComponent },
  { path: 'manage/display', component: ManageOrderDisplayComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
