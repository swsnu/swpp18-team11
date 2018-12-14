import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyCartService } from '../my-cart.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  myCartCount: number;
  myCartCountSubscription: Subscription;
  urlSubscription: Subscription;
  locationUrl: string;
  isPageStore = false;

  constructor(
    private myCartService: MyCartService,
    private router: Router,
    private urlService: UrlService,
  ) { }

  ngOnInit() {
    // getting current url (to differ contents of footer)
    this.locationUrl = this.router.url.substr(1);
    this.urlSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.locationUrl = this.router.url.substr(1);
        this.isPageStore = this.urlService.isUrlStore(this.locationUrl);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.myCartCountSubscription) {
      this.myCartCountSubscription.unsubscribe();
    }
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
  }

  emptyMyCart(): void {
    if (confirm('장바구니를 비우시겠습니까?')) {
      this.myCartService.emptyMyCart().then(() => {
      });
    }
  }
}
