import { TestBed } from '@angular/core/testing';

import { ManageOrderStateService } from './manage-order-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManageOrderStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: ManageOrderStateService = TestBed.get(ManageOrderStateService);
    expect(service).toBeTruthy();
  });
});
