import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LatLng {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  latlng$ = new BehaviorSubject<LatLng|null>(null);
  constructor() {
  }

  loadLatLng(): Promise<LatLng> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const { latitude, longitude } = position.coords;
        const result = { lat: latitude, lng: longitude };
        this.latlng$.next(result);
        resolve(result);
      }, (error) => {
        console.error(error);
        reject(error);
      }, { timeout: 2000 });
    });
  }
}
