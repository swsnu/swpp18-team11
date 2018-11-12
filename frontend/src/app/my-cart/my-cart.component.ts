import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MyCartService } from '../my-cart.service';
import { Purchasable } from '../purchasable';
import { Option } from '../option';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  myCart: Purchasable[];
  totalPrice: number;
  selectedTab = 0;
  selectedIndex: number; // index of purchasable in my cart
  // cartChanged: EventEmitter<Purchasable[]> = new EventEmitter<Purchasable[]>()

  constructor(
    private myCartService: MyCartService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.myCartService.isEmpty()) {
      this.sendToOrderPage();
    }
    this.getMyCart();
    this.updateTotalPrice();
    this.selectedIndex = 0; // initialize
  }

  updateMyCart(cartChanged: Purchasable[]): void {
    this.myCart = cartChanged;
    this.updateTotalPrice();
  }

  getMyCart(): void {
    this.myCart = this.myCartService.getMyCart();
  }
  updateTotalPrice() {
    this.totalPrice = this.myCartService.getTotalPrice();
  }

  /** Functions used in my-cart.component.html **/
  switchTab(): void {
    // switch selectedTab index between 0 and 1
    this.selectedTab = (this.selectedTab + 1) % 2;
  }

  selectIndex(index: number): void {
    // update selectedPurchasable to pass data to select-option component.
    this.selectedIndex = index;
  }

  hasOptions(purchasable: Purchasable): boolean {
    // check if no options at all
    if (!purchasable.options) {
      return false;
    } else if (purchasable.options.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  // some dirty codes to deal with purchasable instances of myCart
  increment(index: number): void {
    const changedCart = this.myCart;
    if (changedCart[index].quantity < 100) {
      changedCart[index].quantity += +1;
      changedCart[index] = this.updatePurchasablePrice(changedCart[index]);
      this.myCartService.updateMyCart(this.myCart);
      this.updateTotalPrice();
    }
  }
  decrement(index: number): void {
    const changedCart = this.myCart;
    if (changedCart[index].quantity > 1) {
      changedCart[index].quantity += -1;
      changedCart[index] = this.updatePurchasablePrice(changedCart[index]);
      this.myCartService.updateMyCart(this.myCart);
      this.updateTotalPrice();
    }
  }

  updateOptionChange(changedOptions: Option[]): void {
    this.myCart[this.selectedIndex].options = changedOptions;
    this.myCart[this.selectedIndex] =
      this.updatePurchasablePrice(this.myCart[this.selectedIndex]);
    this.myCartService.updateMyCart(this.myCart);
    this.updateTotalPrice();
  }

  removePurchasable(index: number): void {
    this.myCartService.removePurchasable(index);
    this.getMyCart();
    if (this.myCartService.isEmpty()) {
      this.sendToOrderPage();
    }
  }

  emptyCart(): void {
    this.myCartService.emptyMyCart();
    this.myCart = [];
    this.sendToOrderPage();
  }
  back(): void {
    this.location.back();
  }
  sendToOrderPage(): void {
    this.router.navigate(['/order']);
  }

  updatePurchasablePrice(item: Purchasable): Purchasable {
    let option_total = 0;
    for (const option of item.options) {
      option_total += option.total_price;
    }
    item.total_price = item.quantity * (item.base_price + option_total);
    return item;
  }
}
