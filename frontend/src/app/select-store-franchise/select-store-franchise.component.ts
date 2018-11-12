import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '../store.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, concatMap, map, tap, startWith } from 'rxjs/operators';
import { Franchise } from '../franchise';

interface Word {
  name: string;
  strong: boolean;
}

interface FranchiseOption {
  franchise: Franchise;
  words: Word[];
}


@Component({
  selector: 'app-select-store-franchise',
  templateUrl: './select-store-franchise.component.html',
  styleUrls: ['./select-store-franchise.component.css']
})
export class SelectStoreFranchiseComponent implements OnInit, OnDestroy {
  @Output() select = new EventEmitter<Franchise>();

  franchiseCtrl = new FormControl();
  franchiseOptions$: Observable<FranchiseOption[]>;
  franchiseOptions: FranchiseOption[] = [];
  franchiseOptionsSub: Subscription;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.franchiseOptions$ = this.franchiseCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      concatMap((keyword: string) => (
        this.storeService.searchFranchise(keyword)
          .pipe(map(franchises => franchises.map(franchise => this.toFranchiseOption(franchise, keyword))))
      ))
    );
    this.franchiseOptionsSub = this.franchiseOptions$.subscribe(x => this.franchiseOptions = x);
  }

  ngOnDestroy() {
    this.franchiseOptionsSub.unsubscribe();
  }


  toFranchiseOption(franchise: Franchise, keyword: string): FranchiseOption {
    const franchiseName = franchise.name;
    const words: Word[] = [];

    const index = 0;
    const newIndex = franchiseName.indexOf(keyword, index);
    if (newIndex !== -1) {
      words.push({ name: franchiseName.slice(index, newIndex), strong: false });
      words.push({ name: franchiseName.slice(newIndex, newIndex + keyword.length), strong: true });
      words.push({ name: franchiseName.slice(newIndex + keyword.length), strong: false });
    } else {
      words.push({ name: franchiseName, strong: false });
    }

    return { franchise, words };
  }

  handleSelect(event) {
    const selectedIndex = event.source.options.toArray().indexOf(event.option);
    if (selectedIndex >= 0 && selectedIndex < this.franchiseOptions.length) {
      const franchiseOption = this.franchiseOptions[selectedIndex];
      const franchiseId = franchiseOption.franchise.id;
      this.select.emit(franchiseOption.franchise);
    }
  }
}
