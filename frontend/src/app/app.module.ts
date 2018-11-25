import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { NgIdleModule } from '@ng-idle/core';
import { UserIdleModule } from 'angular-user-idle';
/* Components */
import { AppComponent } from './app.component';
import { SelectFoodComponent } from './select-food/select-food.component';
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageOrderDisplayComponent } from './manage-order-display/manage-order-display.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { SelectStoreComponent } from './select-store/select-store.component';
import { SelectStoreFranchiseComponent } from './select-store-franchise/select-store-franchise.component';
import { SelectStoreMapComponent } from './select-store-map/select-store-map.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MyCartDialogComponent } from './my-cart-dialog/my-cart-dialog.component';

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
import { MatGridListModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material';

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
    HeaderComponent,
    FooterComponent,
    SelectStoreComponent,
    SelectStoreFranchiseComponent,
    SelectStoreMapComponent,
    MyCartDialogComponent,
  ],
  entryComponents: [
    MyCartDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDu0iA5-XMLZAnXz23unMayd6V6lPYygwk',
    }),
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    DragDropModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgIdleModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

