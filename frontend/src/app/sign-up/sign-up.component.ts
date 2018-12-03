import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.username = 'user1';
    this.password = 'user1';
    this.confirmPassword = 'user1';
  }

  onClickSignUp() {
    if (this.password !== this.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    } else {
      this.userService.signUp(this.username, this.password);
    }
  }
}
