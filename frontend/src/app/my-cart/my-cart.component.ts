import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Purchasable } from "../purchasable";
import { MyCartService } from "../my-cart.service";

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  myCart$ : Observable<Purchasable[]>

  constructor(
    private myCartService: MyCartService
  ) { }

  ngOnInit() {
    this.getMyCart()
  }

  getMyCart(): void {
    this.myCart$ = this.myCartService.getMyCart()
  }

  removePurchasable(purchasable: Purchasable): void {
    this.myCartService.removePurchasable(purchasable)
  }


}
