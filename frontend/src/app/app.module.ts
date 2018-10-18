import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MyCartComponent } from './my-cart/my-cart.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectOptionComponent } from './select-option/select-option.component';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { SelectFoodComponent } from './select-food/select-food.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderDisplayComponent } from './manage-order-display/manage-order-display.component';


@NgModule({
  declarations: [
    AppComponent,
    MyCartComponent,
    SelectOptionComponent,
    SelectFoodComponent,
    ManageOrderComponent,
    ManageOrderDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
