import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TxItem } from './tx-item';
import { Router } from '@angular/router';
import { Store } from './store';

class User {
  id: string;
  username: string;
  userType: string;
  constructor(id: string, username: string, userType: string) {
    this.id = id;
    this.username = username;
    this.userType = userType;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(username: string, password: string): Promise<any> {
    const url = '/kiorder/api/v1/user/sign_up';
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.http.post(url, body)
      .pipe()
      .toPromise()
      .then(response => this.handleSignInSuccess(response))
      .catch(e => this.handleError(e));
  }
  signIn(username: string, password: string): Promise<any> {
    const url = '/kiorder/api/v1/user/sign_in';
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.http.post(url, body)
      .pipe()
      .toPromise()
      .then(response => this.handleSignInSuccess(response))
      .catch(e => this.handleError(e));
  }
  signOut(): Promise<any> {
    const url = '/kiorder/api/v1/user/sign_out';
    return this.http.get(url)
      .pipe()
      .toPromise()
      .then(response => {
        this.setCurrentUser(null);
        this.router.navigateByUrl('/sign-in');
      })
      .catch(e => this.handleError(e));
  }
  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }
  setCurrentStore(store: Store) {
    const url = '/kiorder/api/v1/user/current_store';
    const body = new FormData();
    body.append('store_id', store.id.toString());
    return this.http.post(url, body)
      .pipe()
      .toPromise();
  }
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  get userType(): string {
    return this.getCurrentUser().userType;
  }
  getUserId(): string {
    const currentUser = this.getCurrentUser();
    return currentUser.id;
  }
  getMyTx(): Observable<TxItem[]> {
    const userId = this.getUserId();
    const url = '/kiorder/api/v1/test_tx/' + userId;
    return this.http.get(url)
      .pipe(map((res: any) => {
        const txItems = res.data.map(txItem => this.loadTxItem(txItem));
        return txItems;
      }));
  }
  loadTxItem(txItem: any): TxItem {
    return new TxItem({
      purchasable: txItem.purchasable,
      purchasableName: txItem.purchasable_name,
      purchasableBasePrice: txItem.purchasable_base_price,
      qty: txItem.qty,
      price: txItem.price,
      options: txItem.options,
      totalPrice: txItem.total_price,
      createdAt: txItem.created_at,
      state: txItem.state
    });
  }
  handleSignInSuccess(response: any) {
    if (response.success) {
      this.setCurrentUser(new User(response.data.user_id, response.data.username, response.data.user_type));
      this.router.navigateByUrl('/store');
    }
  }
  handleError(e: any) {
    alert(e.error.message);

    switch (e.error.code) {
      default:
        break;
    }
    return e;
  }
}
