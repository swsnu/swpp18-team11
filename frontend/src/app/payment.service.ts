import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Purchasable } from './purchasable';
import { Observable } from 'rxjs';
import { MyCartItem } from './my-cart-item';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private router: Router,
    private  http: HttpClient
  ) { }

  toPaymentPage(): void {
    this.router.navigate(['/payment']);
  }

  notifyPaymentFinished(mycart: MyCartItem[]): Promise<any> {
    const url = '/kiorder/api/v1/test_tx';
    const body = new FormData();
    const order_spec = this.convertMyCartToOrderSpec(mycart);
    body.append('order_spec', order_spec);
    return this.http.post(url, body)
      .pipe()
      .toPromise()
      .then(res => {
        const utxid = res['data']['utxid'];
        return this.http.post(url + '/' + utxid + '/finish', new FormData())
          .pipe()
          .toPromise();
      })
      .catch(err => console.log(err));
  }

  convertMyCartToOrderSpec(mycart: MyCartItem[]): string {
    return mycart.map(myCartItem => {
      const purchasable = myCartItem.purchasable;
      const validOptions = purchasable.options.filter(option => option.quantity > 0);
      return `${purchasable.id}-${purchasable.quantity}` + validOptions.map(option => `#${option.id}-${option.quantity}`).join('');
    }).join(' ');
  }
}
