import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { Purchasable } from "../purchasable";
import { MyCartService } from "../my-cart.service";

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  myCart: Purchasable[]
  totalPrice: number

  constructor(
    private myCartService: MyCartService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    if(this.myCartService.isEmpty()){
      this.sendToOrderPage()
    }
    this.updateMyCart()
  }

  updateMyCart(): void {
    this.getMyCart()
    this.updateTotalPrice()
  }
  getMyCart(): void {
    this.myCart = this.myCartService.getMyCart()
  }
  updateTotalPrice() {
    this.totalPrice = this.myCartService.getTotalPrice()
  }


  /** Functions used in my-cart.compomenet.html **/

  hasOption(purchasable: Purchasable): boolean {
    for (let option of purchasable.options){
      if(option.quantity !== 0)
        return true
    }
    return false
  }

  // TODO: increment, decrement, adjustOptions
  increment(index: number): void{

  }
  decrement(index: number): void{

  }
  adjustOptions(): void {

  }

  removePurchasable(index: number): void {
    this.myCartService.removePurchasable(index)
    this.updateMyCart()
    if(this.myCartService.isEmpty())
      this.sendToOrderPage()
  }

  emptyCart(): void {
    this.myCartService.emptyMyCart()
    this.sendToOrderPage()
  }

  back(): void {
    this.location.back();
  }

  sendToOrderPage(): void {
    this.router.navigate(['/order'])
  }

}
