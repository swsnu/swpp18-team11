import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  { path: 'mycart', component: MyCartComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
