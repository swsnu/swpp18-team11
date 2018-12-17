import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MenuDataService } from '../menu-data.service';
import { MyCartService } from '../my-cart.service';

import { Purchasable } from '../purchasable';

@Component({
  selector: 'app-specify-order',
  templateUrl: './specify-order.component.html',
  styleUrls: ['./specify-order.component.css']
})
export class SpecifyOrderComponent implements OnInit {
  expandOption = false;
  purchasable: Purchasable;

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private menuDataService: MenuDataService,
    private myCartService: MyCartService,
  ) { }

  ngOnInit() {
    this.getProductInfo();
  }
  getProductInfo(): void {
    const id: string = this.location.path().substring(7);
    this.menuDataService.getProductInfo(id)
      .then(purchasable => {
        this.purchasable = purchasable;
      })
      .catch(error => {
        alert('존재하지 않는 메뉴 id 입니다');
        this.cancel();
      });
  }
  changeOptionPageStatus(opened: boolean): void {
    this.expandOption = opened;
  }
  openOptionSelectPage(): void {
    this.expandOption = !this.expandOption;
  }
  cancel(): void {
    this.location.back();
  }
  addToCart(): void {
    this.myCartService.addMyCart(this.purchasable);
    this.location.back();
  }
  buyNow(): void {
    this.myCartService.addMyCart(this.purchasable)
      .then(() => this.myCartService.toMyCartPage());
  }
}
