import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Category } from "./category";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private purchasableUrl = '/kiorder/api/v1/purchasable'

  constructor(
    private http: HttpClient
  ) {}


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
