import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  locationUrl: string = '';
  subscription: Subscription;

  constructor(
    private router: Router
  ){
    this.locationUrl = this.router.url;
    this.subscription = this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.locationUrl = this.router.url;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
