import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  maskedPassword: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.username = 'user1';
    this.password = 'user1';
    this.maskedPassword = '*'.repeat(this.password.length);
  }

  onClickSignIn() {
    this.userService.signIn(this.username, this.password);
  }
  onClickSignOut() {
    this.userService.signOut();
  }
  onInputPassword() {
    if (this.maskedPassword.length > this.password.length) {
      this.password = this.password + this.maskedPassword.slice(-1);
      this.maskedPassword = '*'.repeat(this.password.length);
    } else {
      this.password = this.password.slice(0, -1);
    }
  }
}
