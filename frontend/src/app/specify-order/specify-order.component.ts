import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PaymentService } from '../payment.service';

import { Purchasable } from '../purchasable';
import { Option } from '../option';
import { BackendResponse } from './backend-response';

@Component({
  selector: 'app-specify-order',
  templateUrl: './specify-order.component.html',
  styleUrls: ['./specify-order.component.css']
})
export class SpecifyOrderComponent implements OnInit {
  expandOption = false;
  // TODO: @Input() product: Purchasable;
  product: Purchasable;
  selectedOptions: Option[] = [];

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.getProductInfo()
      .then(purchasable => {
        this.product = purchasable.data;
        this.product.base_price = Math.floor(this.product.base_price);
        this.product.quantity = 1;
        this.updateTotalPrice();
      })
      .catch(error => alert('존재하지 않는 메뉴 id입니다'));
  }
  getProductInfo(): Promise<BackendResponse> {
    const id: string = this.location.path().substring(7);
    const url = '/kiorder/api/v1/purchasable/' + id;
    return this.http.get<BackendResponse>(url)
      .pipe()
      .toPromise();
  }
  openOptionSelectPage(): void {
    this.expandOption = !this.expandOption;
  }
  updateTotalPrice(): void {
    let optionPrice = 0;
    for (const option of this.selectedOptions) {
      optionPrice += option.total_price;
    }
    this.product.total_price = this.product.quantity * (this.product.base_price + optionPrice);
  }
  updateOptionChange(changedOptions: Option[]): void {
    this.selectedOptions = changedOptions;
    this.updateTotalPrice();
  }
  decrement(): void {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1;
    }
    this.updateTotalPrice();
  }
  increment(): void {
    if (this.product.quantity < 100) {
      this.product.quantity += 1;
    }
    this.updateTotalPrice();
  }
  cancel(): void {
    this.location.back();
  }
  addToCart(): void {
    // TODO
    return;
  }
  buyNow(): void {
    this.paymentService.buyNow([this.product]);
  }
}
