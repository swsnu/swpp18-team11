import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit, OnDestroy {

  @Input() sideNavOpenEvent: EventEmitter<boolean>;
  @Output() sideNavClosed = new EventEmitter<boolean>();
  subscriber: Subscription;
  userName = '';
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
    this.subscriber = this.sideNavOpenEvent.subscribe(() => this.getUser());
  }

  ngOnDestroy() {
    if (this.subscriber) {
      return this.subscriber.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return (this.user !== null);
  }

  signOut(): void {
    this.userService.signOut().then(
      () => this.sideNavClosed.emit(true));
  }

  navigator(url: string): void {
    this.router.navigate([url]).then(
      () => this.sideNavClosed.emit(true));
  }

  private getUser(): void {
    this.user = this.userService.getCurrentUser();
  }
}
