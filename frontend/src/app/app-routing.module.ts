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
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'store', component: SelectStoreComponent, canActivate: [AuthGuard] },
  { path: 'order', component: SelectFoodComponent, canActivate: [AuthGuard] },
  { path: 'order/:menu_id', component: SpecifyOrderComponent, canActivate: [AuthGuard] },
  { path: 'mycart', component: MyCartComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuard] },
  { path: 'manage/order', component: ManageOrderComponent, canActivate: [AuthGuard] },
  { path: 'manage/display', component: ManageOrderDisplayComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  // TODO: is this right behavior when user is already signed in and moves to wrong pages?
  { path: '**', redirectTo: '/sign-in', pathMatch: 'full'},
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
