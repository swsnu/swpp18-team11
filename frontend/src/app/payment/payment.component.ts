import { Component, OnInit } from '@angular/core';

import { Purchasable } from '../purchasable';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  buyList: Purchasable[];
  constructor() { }

  ngOnInit() {
  }
}
