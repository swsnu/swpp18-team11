import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-specify-order',
  templateUrl: './specify-order.component.html',
  styleUrls: ['./specify-order.component.css']
})
export class SpecifyOrderComponent implements OnInit {
  expandOption = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  getProductInfo() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.get()
    return;
  }
  openOptionSelectPage() {
    this.expandOption = !this.expandOption;
    // TODO
    return;
  }
}
