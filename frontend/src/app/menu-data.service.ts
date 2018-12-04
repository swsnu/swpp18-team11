import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Category } from './category';
import { Purchasable } from './purchasable';
import { Router } from '@angular/router';
import { Option } from './option';
import { Badge } from './badge';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  purchasable$: Observable<Purchasable>;
  private purchasableUrl = '/kiorder/api/v1/purchasable';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /** http GET method **/
  public getCategories(): Observable<Category[]> {
    return this.http.get(this.purchasableUrl)
      .pipe(catchError(error => this.handleError(error)))
      .pipe(map((response: any) => {
        const categories: Category[] = <Category[]>response.data.list;
        return categories;
      }));
  }

  getProductInfo(productId): Promise<Purchasable> {
    const url = '/kiorder/api/v1/purchasable/' + productId;
    return this.http.get(url)
      .pipe(catchError(error => this.handleError(error)))
      .pipe(map((response: any) => {
        const data = response.data;
        data.options = data.options.map(opt => this.loadOption(opt));
        data.badges = data.badges.map(badge => this.loadBadge(badge));
        return new Purchasable(data);
      }))
      .toPromise();
  }

  handleError(e: any) {
    alert(e.error.message);

    switch (e.error.code) {
      case 'AUTH-001':
        this.router.navigateByUrl('/sign-in');
        break;
      case 'NOSTORE-001':
        this.router.navigateByUrl('/store');
        break;
      default:
        break;
    }
    return e;
  }

  private loadOption(opt: any): Option {
    return new Option(opt);
  }

  private loadBadge(badge: any): Badge {
    return new Badge(badge);
  }
}
