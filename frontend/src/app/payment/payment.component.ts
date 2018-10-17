import { Component, OnInit } from '@angular/core';

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
  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.buyList = this.paymentService.getBuyList();
    for (const product of this.buyList) {
      this.totalPrice += product.total_price;
    }
  }
}
