import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpecifyOrderComponent } from './specify-order/specify-order.component';
import { SelectOptionComponent } from './select-option/select-option.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecifyOrderComponent,
    SelectOptionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
