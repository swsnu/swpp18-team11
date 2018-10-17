import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Purchasable } from './purchasable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  buyList: Purchasable[];

  constructor(private router: Router) { }
  buyNow(productList: Purchasable[]): void {
    this.buyList = productList;
    this.router.navigate(['/payment']);
  }
  getBuyList(): Purchasable[] {
    return this.buyList;
  }
  emptyBuyList(): void {
    this.buyList = [];
  }
  notifyPaymentFinished(): void {
    // TODO: Notify the payment info to clerk side
    return;
  }
}
