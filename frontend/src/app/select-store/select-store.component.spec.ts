import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SelectStoreComponent } from './select-store.component';
import { DEFAULT_IMPORTS } from '../testing';

describe('SelectStoreComponent', () => {
  let component: SelectStoreComponent;
  let fixture: ComponentFixture<SelectStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...DEFAULT_IMPORTS],
      declarations: [ SelectStoreComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
