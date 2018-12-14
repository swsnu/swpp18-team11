import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }
  @Output() sideNavClosed = new EventEmitter<boolean>();
  userName = '';
  user: User;

  ngOnInit() {
    this.getUser();
  }

  isLoggedIn(): boolean {
    return (this.user !== null);
  }

  navigator(url: string): void {
    this.router.navigate([url]).then(
      () => this.sideNavClosed.emit(true));
  }

  private getUser(): void {
    this.user = this.userService.getCurrentUser();
  }
}
