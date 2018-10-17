import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { MenuDataService } from "../menu-data.service";

import { Category } from "../category";
import { Menu } from "../menu";
import { Purchasable } from "../purchasable";

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.css']
})
export class SelectFoodComponent implements OnInit {

  categories$: Observable<Category[]>
  //selector: Subject<Category> = new Subject<Category>()
  selected: Category

  constructor(
    private menuDataService: MenuDataService
  ) {}

  ngOnInit() {
    this.getCategories()
  }

  getCategories(): void {
    this.categories$ = this.menuDataService.getCategories()
  }

  // Purchasable has 'total_price' and 'quantity'
  toPurchasable(menu: Menu): Purchasable{
    let purchasable: Purchasable = <Purchasable> menu
    return purchasable
  }

  /* TODO: async binding
      getPurchasables(): Observable<Menu[]> {
      return this.selector.pipe(
        map((category: Category) => category.purchasables)
      )
    }
  */

  selectCategory(selected: Category): void {
    //this.selector.next(selected)
    this.selected = selected
  }

}
