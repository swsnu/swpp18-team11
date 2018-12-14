import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { MyCartService } from './my-cart.service';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  locationUrl = '';
  subscription: Subscription;
  idleWarning = '';
  IDLE_TIMEOUT = 60;
  warningCount = this.IDLE_TIMEOUT > 60 ? 30 : this.IDLE_TIMEOUT / 2;
  sidenavOpened = false;

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.idle.stop();
  }

  constructor(
    private router: Router,
    private idle: Idle,
    private myCartService: MyCartService,
    private userService: UserService
  ) {
    this.locationUrl = this.router.url;
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.locationUrl = this.router.url;
      }
    });

    // set reset timer for kiosk account
    if (this.userService.isLoggedIn() && this.userService.userType !== 'customer') {
      idle.setIdle(0.01);
      idle.setTimeout(this.IDLE_TIMEOUT);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onTimeout.subscribe(() => {
        this.myCartService.emptyMyCart();
        this.router.navigateByUrl('/order');
        this.idle.watch();
      });
      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleWarning = 'time out: ' + countdown + ' seconds left';
      });

      this.idle.watch();
    }
  }

  openSideNav(): void {
    this.sidenavOpened = true;
  }

  closeSideNav(): void {
    this.sidenavOpened = false;
  }

}
