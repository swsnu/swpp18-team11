import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFoodComponent } from './select-food.component';

describe('SelectFoodComponent', () => {
  let component: SelectFoodComponent;
  let fixture: ComponentFixture<SelectFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
