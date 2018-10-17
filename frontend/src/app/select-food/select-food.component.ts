import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { MenuDataService } from "../menu-data.service";

import { Category } from "../category";
import { MyCartService } from "../my-cart.service";
import { Purchasable } from "../purchasable";

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.css']
})
export class SelectFoodComponent implements OnInit {

  categories$: Observable<Category[]>
  selectedCategory: Category
  myCartCount: number = 0

  constructor(
    private menuDataService: MenuDataService,
    public myCartService: MyCartService
  ) {}

  ngOnInit() {
    this.getCategories()
    this.getMyCartCount()
  }

  getCategories(): void {
    this.categories$ = this.menuDataService.getCategories()
  }

  getMyCartCount(): void {
    this.myCartCount = this.myCartService.getMyCartCount()
  }
  selectCategory(selected: Category): void {
    this.selectedCategory = selected
  }

  emptyCart(){
    this.myCartService.emptyMyCart()
    this.getMyCartCount()
  }

}
