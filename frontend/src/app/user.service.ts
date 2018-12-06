import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TxItem } from './tx-item';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    // TODO
    return true;
  }
  getUserId(): string {
    // TODO
    return '4';
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
}
