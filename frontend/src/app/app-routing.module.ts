import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpecifyOrderComponent } from './specify-order/specify-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/order/null',  pathMatch: 'full' },
  { path: 'order/:menu_id', component: SpecifyOrderComponent },
  { path: '**', redirectTo: '/order/null',  pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
