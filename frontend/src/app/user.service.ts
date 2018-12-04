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
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
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
        this.router.navigateByUrl('/order');
      })
      .catch(e => this.handleError(e));
  }
  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  setCurrentStore(store: Store) {
    const url = '/kiorder/api/v1/user/current_store';
    const body = new FormData();
    body.append('store_id', store.id.toString());
    return this.http.post(url, body)
      .pipe()
      .toPromise();
  }
  isLoggedIn() {
    const url = '/kiorder/api/v1/user/me';
    return this.http.get(url)
      .pipe()
      .toPromise()
      .then(response => true)
      .catch(e => false);
  }
  getUserId(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
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
      this.setCurrentUser(new User(response.data.user_id, response.data.username));
      this.router.navigateByUrl('/order');
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
