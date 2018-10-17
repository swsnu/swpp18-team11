import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Purchasable } from './purchasable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private router: Router) { }

  toPaymentPage(): void {
    this.router.navigate(['/payment'])
  }

  notifyPaymentFinished(): void {
    // TODO: Notify the payment info to clerk side
    return;
  }
}

