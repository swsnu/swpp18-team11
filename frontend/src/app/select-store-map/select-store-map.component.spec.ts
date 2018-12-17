import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStoreMapComponent } from './select-store-map.component';
import { DEFAULT_IMPORTS } from '../testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SelectStoreMapComponent', () => {
  let component: SelectStoreMapComponent;
  let fixture: ComponentFixture<SelectStoreMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...DEFAULT_IMPORTS,
        RouterTestingModule
      ],
      declarations: [ SelectStoreMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStoreMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
