import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  locationUrl: string;
  pageTitle: string = "";
  subscription: Subscription;

  constructor(
    private router: Router,
  ) {
    this.locationUrl = this.router.url.substr(1);
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.locationUrl = this.router.url.substr(1);
        this.pageTitle = this.getPageTitle()
      }
    })
  }

  ngOnInit() {
    this.pageTitle = 'KingBurger';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getPageTitle(): string {
    if (!this.locationUrl) {
      return ""
    }
    if (this.isStoreTitle()) {
      return "KingBurger"
    }
    switch(this.locationUrl) {
      case "sign-in": return "Sign In";
      case "sign-up": return "Sign Up";
      case "store": return "Select Store!";
      case "my-order": return "My Orders";
      default: return "Not a valid page"
    }
  }

  private isStoreTitle(): boolean {
    if (!this.locationUrl) {
      return false;
    }
    else if (
      this.locationUrl.startsWith('order') ||
      this.locationUrl.startsWith('mycart') ||
      this.locationUrl.startsWith('payment')
    ) {
      return true;
    }
    else {
      return false;
    }
  }
}
