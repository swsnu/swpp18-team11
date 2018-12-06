import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { StoreService } from './store.service';
import { DEFAULT_IMPORTS } from './testing';
import { of } from 'rxjs';

describe('StoreService', () => {
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of(null)
    });
  });
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...DEFAULT_IMPORTS],
    providers: [ { provide: HttpClient, useValue: httpClientSpy } ],
  }));

  it('should be created', () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
