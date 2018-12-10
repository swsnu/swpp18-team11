import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { DEFAULT_IMPORTS } from './testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ...DEFAULT_IMPORTS,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
