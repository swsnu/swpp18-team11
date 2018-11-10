import { Component, OnInit } from '@angular/core';
import { MyCartService } from '../my-cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  myCartCount: number;
  constructor(
    private myCartService: MyCartService
  ) { }

  ngOnInit() {
    this.setMyCartCount();
  }

  emptyMyCart(): void {
    if (confirm('장바구니를 비우시겠습니까?')) {
      this.myCartService.emptyMyCart();
      this.setMyCartCount();
    }
  }
  // TODO: Make async version of myCartService!
  setMyCartCount(): void {
    this.myCartCount = this.myCartService.getMyCartCount();
  }
}
