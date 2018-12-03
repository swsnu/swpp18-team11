import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuDataService } from '../menu-data.service';

import { Category } from '../category';
import { MyCartService } from '../my-cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.css']
})
export class SelectFoodComponent implements OnInit {

  categories$: Observable<Category[]>;
  selectedCategory: Category;

  constructor(
    private menuDataService: MenuDataService,
    public myCartService: MyCartService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  categorySelected($event): void {
    this.categories$.subscribe(categories => {
      this.selectedCategory = categories[$event.index];
      });
  }

  mathFloor(num: number): number {
    return Math.floor(num);
  }

  getCategories(): void {
    this.categories$ = this.menuDataService.getCategories();
  }
}
