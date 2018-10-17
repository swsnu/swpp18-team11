import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';

import { Purchasable } from '../purchasable';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  buyList: Purchasable[];
  totalPrice = 0;
  status = {
    confirmedBuyList: false,
    paymentMethodChosen: false,
    paymentMethod: ''
  };
  constructor(
    private location: Location,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.getBuyList();
    for (const product of this.buyList) {
      this.totalPrice += product.total_price;
    }
  }
  getBuyList(): void {
    this.buyList = this.paymentService.getBuyList();
  }
  cleanUp(): void {
    this.paymentService.emptyBuyList();
    this.getBuyList();
    this.status.confirmedBuyList = false;
    this.status.paymentMethodChosen = false;
    this.status.paymentMethod = '';
  }
  cancelPayment(): void {
    this.cleanUp();
    this.location.back();
  }
  confirm(): void {
    if (!this.status.confirmedBuyList) {
      this.confirmBuyList();
    } else if (!this.status.paymentMethodChosen) {
      this.confirmPaymentMethod();
    } else {
      this.finishPayment();
    }
  }
  confirmBuyList(): void {
    this.status.confirmedBuyList = true;
  }
  confirmPaymentMethod(): void {
    this.status.paymentMethodChosen = true;
  }
  setPaymentMethod(method: string): void {
    /*
    assert (method === 'card' ||
        method === 'cash' ||
        method === 'mobile')
      return; // Error
    }*/
    this.status.paymentMethod = method;
  }
  finishPayment(): void {
    this.paymentService.notifyPaymentFinished();
    this.cleanUp();
    this.router.navigate(['/order']);
  }
}
