import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MyCartItem } from './my-cart-item';
import { Purchasable } from './purchasable';
import { Option } from './option';
import { Badge } from './badge';



@Injectable({
  providedIn: 'root'
})
export class MyCartService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  private myCartUrl = '/kiorder/api/v1/mycart/';
  private httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'})};

  toMyCartPage(): void {
    this.router.navigate(['/mycart']);
  }

  getTotalPrice(): Promise<number> {
    return this.getMyCart().pipe(map(myCart => {
      let totalPrice = 0;
       for (const myCartItem of myCart) {
         const purchasable = myCartItem.purchasable;
         totalPrice += purchasable.quantity * (purchasable.base_price
             + this.getOptionTotalPrice(purchasable.options));
       }
      return totalPrice;
    })).toPromise();
  }

  /** MyCart GET operations **/
  getMyCart(): Observable<MyCartItem[]> {
    return this.http.get(this.myCartUrl)
      .pipe(map((response: any) => {
        return response.data.purchasables.map(data => this.loadMyCartItem(data));
      })
    );
  }

  /** MyCart POST operations **/
  addMyCart(purchasable: Purchasable) {
    const orderSpec = this.convertPurchasableToOrderSpec(purchasable);
    const formData = new FormData();
    formData.append('order_spec', orderSpec);
    return this.http.post(this.myCartUrl, formData).toPromise();
  }

  /** MyCart PATCH operations **/
  patchMyCartQty(myCartItem: MyCartItem, quantity) {
    const url = this.myCartUrl + myCartItem.myCartItemId;
    const formData = `qty=${quantity}`;
    return this.http.patch(url, formData, this.httpOptions).toPromise();
  }

  patchMyCartOptions(myCartItem: MyCartItem, options: Option[]) {
    const url = this.myCartUrl + myCartItem.myCartItemId;
    const optionSpec = this.convertOptionsToOptionSpec(options);
    const formData = `option_spec=${optionSpec}`;
    return this.http.patch(url, formData, this.httpOptions).toPromise();
  }

  /** MyCart DELETE operations **/
  emptyMyCart() {
    return this.http.delete(this.myCartUrl).toPromise();
  }

  removeMyCartItem(myCartItem: MyCartItem) {
    const url = this.myCartUrl + myCartItem.myCartItemId;
    return this.http.delete(url).toPromise();
  }

  /** private helper methods **/
  private loadMyCartItem(opt: any): MyCartItem {
    return new MyCartItem({
      myCartItemId: opt.item_id,
      purchasable: new Purchasable({
        id: opt.purchasable_id,
        name: opt.name,
        thumbnail: opt.thumbnail,
        base_price: opt.base_price,
        quantity: opt.qty,
        total_price: opt.total_price,
        options: opt.options.map(x => this.loadMyCartItemOption(x)),
        badges: opt.badges.map(x => this.loadMyCartItemBadge(x))
      })
    });
  }
  private loadMyCartItemOption(opt: any): Option {
    return new Option({
      id: opt.id,
      name: opt.name,
      base_price: opt.base_price,
      max_capacity: opt.max_capacity,
      quantity: opt.qty
    });
  }
  private loadMyCartItemBadge(opt: any): Badge {
    return new Badge({
      id: opt.id,
      name: opt.id,
      thumbnail: opt.icon
    });
  }

  private convertPurchasableToOrderSpec(purchasable: Purchasable): string {
    return `${purchasable.id}-${purchasable.quantity}` +
      purchasable.options.map(option => `#${option.id}-${option.quantity}`).join('');
  }
  private convertOptionsToOptionSpec(options: Option[]): string {
    return options.map(option => {
      return `${option.id}-${option.quantity}`;
    }).join(' ');
  }

  private getOptionTotalPrice(options: Option[]): number {
    let totalPrice = 0;
    for (const option of options) {
      totalPrice += option.quantity * option.base_price;
    }
    return totalPrice;
  }

}
