import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

import { MenuDataService } from "../menu-data.service";

import { Category } from "../category";

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
  /* TODO: async binding.
      getPurchasables(): Observable<Purchasable[]> {
      return this.selector.pipe(
        map((category: Category) => category.purchasables)
      )
    }

    getName() {
      this.selector.subscribe(
        item => this.name = item.name,
        error => console.log(error)
      )
    }
  */
  selectCategory(selected: Category): void {
    //this.selector.next(selected)
    this.selected = selected
  }

}
