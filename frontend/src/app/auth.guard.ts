import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (await this.userService.isLoggedIn()) {
      return true;
    } else {
      alert('로그인이 필요한 페이지입니다');
      this.router.navigateByUrl('/sign-in');
      return false;
    }
  }
}
