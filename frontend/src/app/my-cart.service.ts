import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { Purchasable } from "./purchasable";

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  constructor() { }

  myCartStorage(): Purchasable[] {
    return JSON.parse(localStorage.getItem('myCart'))
  }

  /** SelectOrder Component function **/
  getMyCartCount(): Observable<number> {
    return of(this.myCartStorage())
      .pipe(
        map((purchasables: Purchasable[]) => purchasables.length)
      )
  }

  //그럼 edit-purchasable service 만들게요

  /** MyCart Component function **/
  removePurchasable(toDelete: Purchasable): void {
    this.updateMyCart(
      this.myCartStorage().filter(
      item => item != toDelete
      ))
  }

  /** MyCart GET, PUT, POST, DELETE **/
  getMyCart(): Observable<Purchasable[]> {
    let myCart: Purchasable[] = this.myCartStorage()
    return of(myCart)
  }

  setMyCart(myCart: Purchasable[]): Observable<Purchasable[]>{
    localStorage.setItem('myCart', JSON.stringify(myCart))
    return of(myCart)
  }

  updateMyCart(myCart: Purchasable[]): Observable<Purchasable[]> {
    return this.setMyCart(myCart)
  }

  emptyMyCart(): Observable<Purchasable[]> {
    return this.setMyCart([])
  }


}
