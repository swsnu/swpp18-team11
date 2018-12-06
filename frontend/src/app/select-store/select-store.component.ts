import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '../store.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, concatMap, map, tap, startWith } from 'rxjs/operators';
import { Franchise } from '../franchise';

@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  styleUrls: ['./select-store.component.css']
})
export class SelectStoreComponent implements OnInit, OnDestroy {
  franchiseId: any | null = null;

  ngOnInit() { }
  ngOnDestroy() { }

  handleSelect(franchise) {
    this.franchiseId = franchise.id;
  }
}
