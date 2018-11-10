import { Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges } from '@angular/core';
import { StoreService } from '../store.service';
import { GeolocationService, LatLng } from '../geolocation.service';
import { LatLngBounds, LatLngLiteral } from '@agm/core';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Store } from '../store';

interface Marker {
  lat: number;
  lng: number;
  name: string;
  store: Store;
}

@Component({
  selector: 'app-select-store-map',
  templateUrl: './select-store-map.component.html',
  styleUrls: ['./select-store-map.component.css']
})
export class SelectStoreMapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() franchiseId: any;

  completed: boolean;
  height = 500;

  initialLatLng: LatLng = null;
  latLng: LatLng = null;
  radius: number;

  markers$: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>([]);
  markUpdateRequired$: Subject<void> = new Subject<void>();
  markUpdateRequiredSub: Subscription;

  constructor(private storeService: StoreService, private geolocationService: GeolocationService) { }

  ngOnInit() {
    this.geolocationService.loadLatLng().then(latLng => this.initialLatLng = this.latLng = latLng)
      .catch((e) => {
        // Seoul
        this.initialLatLng = this.latLng = { lat: 37.566535, lng: 126.97796919999996 };
        console.error(e);
      })
      .then(() => this.markUpdateRequired$.next());


    this.markUpdateRequiredSub = this.markUpdateRequired$.pipe(
      filter(() => this.radius != null),
      debounceTime(500),
    ).subscribe(() => this.updateMarkers());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.markUpdateRequired$.next();
  }

  ngOnDestroy() {
    this.markUpdateRequiredSub.unsubscribe();
  }

  handleCenterChange(latLngLiteral: LatLngLiteral) {
    const { lat, lng } = latLngLiteral;
    this.latLng = { lat, lng };
    this.markUpdateRequired$.next();
  }

  handleBoundsChange(latLngBounds: LatLngBounds) {
    // 1 deg latitude corresponds to about 110.574 km
    this.radius = Math.abs(latLngBounds.getNorthEast().lng() - latLngBounds.getSouthWest().lng()) * 110.574;
    this.markUpdateRequired$.next();
  }

  updateMarkers() {
    if (this.franchiseId == null || !this.radius) {
      return;
    }

    const { lat, lng } = this.latLng;
    const radiusInKm = this.radius;

    this.storeService.searchStoresNearby(this.franchiseId, { lat, lng, radiusInKm })
      .toPromise()
      .then((stores) => {
        console.log(stores);
        this.markers$.next(stores.map(store => (
          {
            lat: store.location.lat,
            lng: store.location.lng,
            name: store.name,
            store: store,
          }
        )));
      });
  }
}
