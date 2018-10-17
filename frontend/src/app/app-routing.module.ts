import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectFoodComponent} from "./select-food/select-food.component";
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full'},
  { path: 'order', component: SelectFoodComponent },
  { path: '', redirectTo: '/order/null',  pathMatch: 'full' },
  { path: 'order/:menu_id', component: SpecifyOrderComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
