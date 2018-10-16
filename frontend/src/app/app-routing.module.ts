import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';

import { SelectFoodComponent} from "./select-food/select-food.component";

const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full'},
  { path: 'order', component: SelectFoodComponent }
  // TODO: connect with Feature 2
  // { path: 'order/:id', component: SpecifyOrderComponent }
]


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
