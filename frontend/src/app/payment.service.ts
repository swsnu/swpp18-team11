import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Purchasable } from './purchasable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private router: Router,
    private  http: HttpClient
  ) { }

  toPaymentPage(): void {
    this.router.navigate(['/payment'])
  }

  notifyPaymentFinished(mycart: Purchasable[]): void {
    const url = '/kiorder/api/v1/test_tx';
    const body = new FormData();
    const order_spec = this.convertMyCartToOrderSpec(mycart);
    alert(order_spec);
    body.append('order_spec', order_spec);
    this.http.post(url, body)
      .pipe()
      .toPromise()
      .then(res => {
        const utxid = res['data']['utxid'];
        this.http.post(url + '/' + utxid + '/finish', new FormData())
          .pipe().toPromise();
      })
      .catch(err => console.log(err));
    return;
  }

  convertMyCartToOrderSpec(mycart: Purchasable[]): string {
    let order_spec = '';
    for (const purchasable of mycart) {
      order_spec += purchasable.id + '-' + purchasable.quantity;
      for (const option of purchasable.options) {
        if (option.quantity > 0) {
          order_spec += '#' + option.id + '-' + option.quantity;
        }
      }
      order_spec += ' ';
    }
    return order_spec;
  }
}
