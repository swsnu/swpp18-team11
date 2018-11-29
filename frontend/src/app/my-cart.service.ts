import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MyCartItem } from "./my-cart-item";
import { Purchasable } from './purchasable';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  private mycartUrl = '/kiorder/api/v1/mycart';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  toMyCartPage(): void {
    this.router.navigate(['/mycart']);
  }
/*
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
*/
  /** SelectOrder Component function **/
  getMyCartCount(): number {

  }

  /** MyCart, Payment Component function **/
  getTotalPrice(): number {

  }

  isEmpty(): boolean {
  }

  removePurchasable(myCartItemId: number): void {

  }

  /** MyCart GET operations **/
  getMyCart(): MyCartItem[] {

  }

  getMyCartItem(): MyCartItem{

  }

  /** MyCart POST operations **/
  addMyCartItem(): void {

  }

  /** MyCart PATCH operations **/
  patchMyCartItem(): void {

  }

  /** MyCart DELETE operations **/
  emptyMyCart(): void {
  }


}
