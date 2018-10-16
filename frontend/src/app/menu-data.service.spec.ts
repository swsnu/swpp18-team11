import { TestBed } from '@angular/core/testing';

import { MenuDataService } from './menu-data.service';

describe('MenuDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuDataService = TestBed.get(MenuDataService);
    expect(service).toBeTruthy();
  });
});
