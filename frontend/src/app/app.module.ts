import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectOptionComponent } from './select-option/select-option.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCartComponent,
    SelectOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
