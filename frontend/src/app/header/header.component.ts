import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  locationUrl: string;
  pageTitle = '';
  subscription: Subscription;
  isPageStore = false;

  constructor(
    private router: Router,
    private urlService: UrlService,
  ) {
    this.locationUrl = this.router.url.substr(1);
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.locationUrl = this.router.url.substr(1);
        this.pageTitle = this.urlService.getPageTitle(this.locationUrl);
        this.isPageStore = this.urlService.isUrlStore(this.locationUrl);
      }
    });
  }

  ngOnInit() {
    this.pageTitle = 'KingBurger';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
