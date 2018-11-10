import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectFoodComponent } from './select-food/select-food.component';
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderDisplayComponent } from './manage-order-display/manage-order-display.component';
import { MyOrderComponent } from './my-order/my-order.component';


@NgModule({
  declarations: [
    AppComponent,
    SpecifyOrderComponent,
    PaymentComponent,
    MyCartComponent,
    SelectOptionComponent,
    SelectFoodComponent,
    ManageOrderComponent,
    ManageOrderDisplayComponent,
    MyOrderComponent,
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
