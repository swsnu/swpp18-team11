import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MenuDataService } from '../menu-data.service';
import { MyCartService } from '../my-cart.service';

import { Purchasable } from '../purchasable';
import { Option } from '../option';

@Component({
  selector: 'app-specify-order',
  templateUrl: './specify-order.component.html',
  styleUrls: ['./specify-order.component.css']
})
export class SpecifyOrderComponent implements OnInit {
  expandOption = false;
  product: Purchasable;
  selectedOptions: Option[] = [];

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private menuDataService: MenuDataService,
    private myCartService: MyCartService,
  ) { }

  ngOnInit() {
    this.getProductInfo();
  }
  getProductInfo(): void {
    const id: string = this.location.path().substring(7);
    this.menuDataService.getProductInfo(id)
      .then(purchasable => {
        this.product = new Purchasable(purchasable.data);
        this.product.base_price = Math.floor(this.product.base_price);
        this.product.quantity = 1;
        this.initializeOption();
        this.updateTotalPrice();
      })
      .catch(error => alert('존재하지 않는 메뉴 id입니다'));
  }

  initializeOption(): void {
    if (!this.hasChosenOption()) {
      // initialize options
      for (const option of this.product.options) {
        option.base_price = Math.floor(option.base_price);
        option.quantity = 0;
        option.total_price = 0;
      }
    }
  }
  hasOptions(): boolean {
    if (!this.product.options) {    // check if no options at all
      return false;
    } else if (this.product.options.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  hasChosenOption(): boolean {
    if (!this.product.options) {
      return false;
    } else {
      for (const option of this.product.options) {
        if (option.quantity > 0) {
          return true;
        }
      }
      return false;  // has no options, or all option's quantity is 0
    }
  }
  changeOptionPageStatus(opened: boolean): void {
    this.expandOption = opened;
  }
  openOptionSelectPage(): void {
    this.expandOption = !this.expandOption;
  }
  updateTotalPrice(): void {
    let optionPrice = 0;
    for (const option of this.selectedOptions) {
      optionPrice += option.total_price;
    }
    this.product.total_price = this.product.quantity * (this.product.base_price + optionPrice);
  }
  updateOptionChange(changedOptions: Option[]): void {
    this.selectedOptions = changedOptions;
    this.updateTotalPrice();
  }
  decrement(): void {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1;
    }
    this.updateTotalPrice();
  }
  increment(): void {
    if (this.product.quantity < 100) {
      this.product.quantity += 1;
    }
    this.updateTotalPrice();
  }
  cancel(): void {
    this.location.back();
  }
  addToCart(): void {
    this.myCartService.addMyCart(this.product);
    this.location.back();
  }
  buyNow(): void {
    this.myCartService.addMyCart(this.product);
    this.myCartService.toMyCartPage();
  }
}
