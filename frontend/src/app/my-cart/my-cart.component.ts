import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyCartService } from '../my-cart.service';
import { Purchasable } from '../purchasable';
import { Option } from '../option';
import { MyCartDialogComponent } from "../my-cart-dialog/my-cart-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  myCart: Purchasable[];
  totalPrice: number;
  selectedTab = 0;

  constructor(
    private myCartService: MyCartService,
    private router: Router,
    private location: Location,
    private optionDialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.myCartService.isEmpty()) {
      this.sendToOrderPage();
    }
    this.getMyCart();
    this.updateTotalPrice();
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

  openOptionDialog(index: number): void {
    const purchasable = this.myCart[index];

    // clone purchasable option to originalOption
    let originalOption: Option[] = [];
    for(let option of purchasable.options) {
      originalOption.push(new Option(option));
    }
    const dialogRef = this.optionDialog.open(MyCartDialogComponent,
      {data: purchasable});
    dialogRef.afterClosed().subscribe(changedOption =>{
      if(changedOption){
        this.updateOptionChange(changedOption, index);
      } else {
        // User clicked 'Cancel' or clicked outside of the dialog
        this.updateOptionChange(originalOption, index);
      }
    })
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

  updateOptionChange(changedOptions: Option[], index: number): void {
    this.myCart[index].options = changedOptions;
    this.myCart[index] =
      this.updatePurchasablePrice(this.myCart[index]);
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
