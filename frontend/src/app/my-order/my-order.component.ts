import { Component, OnInit } from '@angular/core';
import { TxItem } from '../tx-item';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  txItems$: Observable<TxItem[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.txItems$ = this.getMyTx();
  }
  getMyTx() {
    return this.userService.getMyTx();
  }
}
