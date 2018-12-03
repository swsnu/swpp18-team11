import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyCartService } from '../my-cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  myCartCount: number;
  myCartCountSubscription;

  constructor(
    private myCartService: MyCartService
  ) { }

  ngOnInit() {
    this.setMyCartCount();
  }

  ngOnDestroy(): void {
    if (this.myCartCountSubscription) {
      this.myCartCountSubscription.unsubscribe();
    }
  }

  emptyMyCart(): void {
    if (confirm('장바구니를 비우시겠습니까?')) {
      this.myCartService.emptyMyCart().then(() => {
        this.setMyCartCount();
      });
    }
  }

  setMyCartCount(): void {
    this.myCartCountSubscription = this.myCartService.getMyCart()
      .subscribe(myCart => this.myCartCount = myCart.length);
  }
}
