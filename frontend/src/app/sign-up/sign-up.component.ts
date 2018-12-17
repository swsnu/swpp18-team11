import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  hide = true; // hide and hideC: to choose whether to show text or **** in password
  hideC = true;

  constructor(
    private userService: UserService,
    private location: Location,

  ) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onClickSignUp() {
    if (this.password !== this.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    } else {
      this.userService.signUp(this.username, this.password);
    }
  }

  back(): void {
    this.location.back();
  }
}
