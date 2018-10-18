import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { Category } from "./category";
import {Purchasable} from "./purchasable";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  purchasable$: Observable<Purchasable>
  private purchasableUrl = '/kiorder/api/v1/purchasable'

  constructor(
    private http: HttpClient
  ) {}

  /** http GET method **/
  public getCategories(): Observable<Category[]> {
    return this.http.get(this.purchasableUrl)
      .pipe(map((response: any) => {
        let categories: Category[] = response.data.list
        return categories
      }))
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T>=>{
      console.error(error)
      return Observable.throw(error)
    }
  }
}
