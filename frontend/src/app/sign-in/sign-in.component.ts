import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  userid: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  onClickSignIn() {
    this.userService.signIn(this.username, this.password);
  }
  onClickSignOut() {
    this.userService.signOut();
  }
}
