import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStoreFranchiseComponent } from './select-store-franchise.component';
import { DEFAULT_IMPORTS } from '../testing';

describe('SelectStoreFranchiseComponent', () => {
  let component: SelectStoreFranchiseComponent;
  let fixture: ComponentFixture<SelectStoreFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...DEFAULT_IMPORTS],
      declarations: [ SelectStoreFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStoreFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
