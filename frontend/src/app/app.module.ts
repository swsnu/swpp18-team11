import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
/* Components */
import { AppComponent } from './app.component';
import { SelectFoodComponent } from './select-food/select-food.component';
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderDisplayComponent } from './manage-order-display/manage-order-display.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
/* Angular Material stuffs */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';


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
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

