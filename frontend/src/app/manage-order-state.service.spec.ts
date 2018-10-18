import { TestBed } from '@angular/core/testing';

import { ManageOrderStateService } from './manage-order-state.service';

describe('ManageOrderStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageOrderStateService = TestBed.get(ManageOrderStateService);
    expect(service).toBeTruthy();
  });
});
