import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyCartService } from '../my-cart.service';
import { Purchasable } from '../purchasable';
import { MyCartDialogComponent } from '../my-cart-dialog/my-cart-dialog.component';
import { MatDialog } from '@angular/material';

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

  getMyCart(): void {
    this.myCart = this.myCartService.getMyCart();
  }
  updateTotalPrice() {
    this.myCartService.updateMyCart(this.myCart);
    this.totalPrice = this.myCartService.getTotalPrice();
  }

  /** Functions used in my-cart.component.html **/
  switchTab(): void {
    // switch selectedTab index between 0 and 1
    this.selectedTab = (this.selectedTab + 1) % 2;
  }
  openOptionDialog(index: number): void {
    const purchasable = this.myCart[index];

    const dialogRef = this.optionDialog.open(MyCartDialogComponent,
      {data: purchasable});

    dialogRef.afterClosed().subscribe(changedOptions => {
      this.updateTotalPrice();
    });
  }

  removePurchasable(index: number): void {
    this.myCartService.removePurchasable(index);
    this.getMyCart();
    if (this.myCartService.isEmpty()) {
      this.sendToOrderPage();
    }
    this.updateTotalPrice();
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
}
