import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { MenuDataService } from "../menu-data.service";

import { Category } from "../category";
import { MyCartService } from "../my-cart.service";
import {map} from "rxjs/operators";

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

  categorySelected($event): void {
    this.categories$.subscribe(categories =>{
      this.selectedCategory = categories[$event.index]
      })
  }

  getCategories(): void {
    this.categories$ = this.menuDataService.getCategories()
  }

  getMyCartCount(): void {
    this.myCartCount = this.myCartService.getMyCartCount()
  }

  emptyCart(){
    this.myCartService.emptyMyCart()
    this.getMyCartCount()
  }

}
