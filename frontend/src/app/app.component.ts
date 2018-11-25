import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { MyCartService } from './my-cart.service';


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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.idle.stop();
  }

  constructor(
    private router: Router,
    private idle: Idle,
    private myCartService: MyCartService
  ) {
    this.locationUrl = this.router.url;
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.locationUrl = this.router.url;
      }
    });

    // TODO: if (user type === kiosk) {
    idle.setIdle(0.01);
    idle.setTimeout(this.IDLE_TIMEOUT);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeout.subscribe(() => {
      this.myCartService.emptyMyCart();
      this.router.navigateByUrl('/order');
      this.idle.watch();
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      /*
      if (countdown > this.warningCount) {
        this.idleWarning = '';
      } else {
        this.idleWarning = '움직임이 없어  ' + countdown + '초 후에 장바구니가 초기화됩니다';
      }
      */
      this.idleWarning = 'time out: ' + countdown + ' seconds left';
    });

    this.idle.watch();
  }
}
