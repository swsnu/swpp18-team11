import { TestBed } from '@angular/core/testing';

import { ManageOrderService } from './manage-order.service';

describe('ManageOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageOrderService = TestBed.get(ManageOrderService);
    expect(service).toBeTruthy();
  });
});
