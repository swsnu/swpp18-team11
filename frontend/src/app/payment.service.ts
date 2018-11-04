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

  notifyPaymentFinished(mycart: Purchasable[]): Promise<any> {
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
