import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Purchasable } from './purchasable';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  constructor(
    private router: Router
  ) {}

  toMyCartPage(): void {
    this.router.navigate(['/mycart']);
  }

  private loadStorage(): Purchasable[] {
    const localCart: string = localStorage.getItem('myCart');
    if (!localCart) {
      return [];
    } else {
      const data: Object[] = JSON.parse(localCart);
      const myCart: Purchasable[] = [];
      for (const purchasable of data) {
        myCart.push(new Purchasable(purchasable));
      }
      return myCart;
    }
  }

  private saveStorage(myCart: Purchasable[]): void {
    localStorage.setItem('myCart', JSON.stringify(myCart));
  }

  /** SelectOrder Component function **/
  getMyCartCount(): number {
    return this.loadStorage().length;
  }

  /** MyCart, Payment Component function **/
  getTotalPrice(): number {
    let totalPrice = 0;
    for (const purchasable of this.loadStorage()) {
      totalPrice += purchasable.total_price;
    }
    return totalPrice;
  }

  isEmpty(): boolean {
    return (this.loadStorage().length === 0);
  }

  removePurchasable(index: number): void {
    const myCart = this.loadStorage();
    if (myCart.length <= index) {
      console.error('Remove index out of bound');
    } else {
      myCart.splice(index, 1);
      this.saveStorage(myCart);
    }
  }

  /** MyCart GET operations **/
  getMyCart(): Purchasable[] {
    return this.loadStorage();
  }

  /** MyCart POST operations **/
  setMyCart(myCart: Purchasable[]): void {
    this.saveStorage(myCart);
  }

  addMyCart(purchasable: Purchasable): void {
    const myCart = this.loadStorage();
    myCart.push(purchasable);
    this.saveStorage(myCart);
  }

  /** MyCart PUT operations **/
  updateMyCart(myCart: Purchasable[]): void {
    this.setMyCart(myCart);
  }

  /** MyCart DELETE operations **/
  emptyMyCart(): void {
    this.saveStorage([]);
  }


}
