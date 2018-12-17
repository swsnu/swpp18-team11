import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MyCartService } from '../my-cart.service';
import { Purchasable } from '../purchasable';
import { MyCartDialogComponent } from '../my-cart-dialog/my-cart-dialog.component';
import { MatDialog } from '@angular/material';
import { MyCartItem } from '../my-cart-item';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit, OnDestroy {

  myCart$: Observable<MyCartItem[]>;
  totalPrice: number;
  subscription: Subscription;

  constructor(
    private myCartService: MyCartService,
    private router: Router,
    private location: Location,
    private optionDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getMyCart();
    this.getTotalPrice();
    this.getMyCartCount();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getMyCart(): void {
    this.myCart$ = this.myCartService.getMyCart();
  }

  getMyCartCount(): void {
    this.subscription = this.myCart$.subscribe(myCartItems => {
      if (myCartItems.length === 0) {
        alert('장바구니가 비어있습니다.');
        this.sendToOrderPage();
      }
    });
  }

  getTotalPrice(): void {
    this.myCartService.getTotalPrice()
      .then(totalPrice => this.totalPrice = totalPrice);
  }

  increment(myCartItem: MyCartItem): void {
    const quantity = myCartItem.purchasable.quantity + 1;
    myCartItem.purchasable.increment();
    this.myCartService.patchMyCartQty(myCartItem, quantity)
      .then(() => this.getTotalPrice());
  }

  decrement(myCartItem: MyCartItem): void {
    // decrement button disabled when quantity is 1 or less.
    const quantity = myCartItem.purchasable.quantity - 1;
    myCartItem.purchasable.decrement();
    this.myCartService.patchMyCartQty(myCartItem, quantity)
      .then(() => this.getTotalPrice());
  }

  openOptionDialog(myCartItem: MyCartItem): void {
    const purchasable = myCartItem.purchasable;
    console.log(purchasable);
    const dialogRef = this.optionDialog.open(MyCartDialogComponent, {data: purchasable});
    dialogRef.afterClosed().subscribe(changedOptions => {
      this.myCartService.patchMyCartOptions(myCartItem, changedOptions)
        .then(() => this.getTotalPrice());
    });
  }

  removeMyCartItem(myCartItem: MyCartItem): void {
    this.myCartService.removeMyCartItem(myCartItem)
      .then(() => {
        this.getMyCart();
        this.getMyCartCount();
        this.getTotalPrice();
      });
  }

  emptyCart(): void {
    this.myCartService.emptyMyCart();
    this.sendToOrderPage();
  }

  sendToOrderPage(): void {
    this.router.navigate(['/order']);
  }
}
