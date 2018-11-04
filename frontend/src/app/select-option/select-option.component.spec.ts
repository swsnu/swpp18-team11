import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import {SpecifyOrderComponent} from '../specify-order/specify-order.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

fdescribe('SelectOptionComponent', () => {
  let component: SelectOptionComponent;
  let fixture: ComponentFixture<SelectOptionComponent>;
  let option1 = {id: 1, name: 'o', base_price: 100, max_capacity: 10, quantity: 0, total_price: 0};
  let option2 = {id: 2, name: 'o', base_price: 200, max_capacity: 10, quantity: 0, total_price: 0}
  const options = [option1, option2];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectOptionComponent,
        SpecifyOrderComponent,
      ],
      imports: [
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionComponent);
    component = fixture.componentInstance;
    component.options = options;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get option by id', () => {
    expect(component.getOptionByID(1)).toBe(option1);
    expect(component.getOptionByID(2)).toBe(option2);
  })

  it('should increment/decrement', () => {
    component.decrement(1);
    expect(component.getOptionByID(1).total_price).toBe(0);
    component.increment(1);
    expect(component.getOptionByID(1).total_price).toBe(100);
    for (let i = 0; i < 10; i++) {
      component.increment(1);
    }
    expect(component.getOptionByID(1).total_price).toBe(1000);
  });
});
