import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Franchise } from './franchise';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }

  searchFranchise(keyword: string): Observable<Franchise[]> {
    return this.http.get('/kiorder/api/v1/franchise', { params: { keyword } })
    .pipe(map((opt: any) => ((opt.data as any[]).map(x => new Franchise(x)))));
  }

  searchStoresNearby(franchiseId: any, options: { lng: number, lat: number, radiusInKm: number }): Observable<Store[]> {
    return this.http.get(
      `/kiorder/api/v1/franchise/${franchiseId}/store`,
      { params: { lng: options.lng.toString(), lat: options.lat.toString(), radius_in_km: options.radiusInKm.toString() } }
    ).pipe(
      map((opt: any) => opt.data),
      map((opts: any[]) => {
        opts.forEach(x => {
          x.franchiseId = x.franchise_id;
        });
        return opts.map(x => new Store(x));
      })
    );
  }
}
