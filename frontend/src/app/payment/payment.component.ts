import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MyCartService } from '../my-cart.service';
import { PaymentService } from '../payment.service';

import { Purchasable } from '../purchasable';
import { Observable } from 'rxjs';
import { MyCartItem } from '../my-cart-item';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  myCart: MyCartItem[];
  totalPrice: number;
  status = {
    confirmedBuyList: false,
    paymentMethodChosen: false,
    paymentMethod: ''
  };

  constructor(
    private location: Location,
    private router: Router,
    private myCartService: MyCartService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.getMyCart();
    this.getTotalPrice();
  }

  getMyCart(): void {
    this.myCartService.getMyCart()
      .toPromise().then(myCart => {
        this.myCart = myCart;
    });
  }

  private getTotalPrice(): void {
    this.myCartService.getTotalPrice().then(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  cleanUp(): void {
    this.myCartService.emptyMyCart();
    this.status.confirmedBuyList = false;
    this.status.paymentMethodChosen = false;
    this.status.paymentMethod = '';
  }

  cancel(): void {
    this.location.back();
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
    this.paymentService.notifyPaymentFinished(this.myCart);
    this.cleanUp();
    this.router.navigate(['/order']);
  }
}
