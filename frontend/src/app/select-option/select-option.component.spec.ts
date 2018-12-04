import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { SpecifyOrderComponent } from '../specify-order/specify-order.component';
import { DEFAULT_IMPORTS } from '../testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Option } from '../option';

describe('SelectOptionComponent', () => {
  let component: SelectOptionComponent;
  let fixture: ComponentFixture<SelectOptionComponent>;
  const option1 = {id: 1, name: 'o', base_price: 100, max_capacity: 10, quantity: 0, total_price: 0};
  const option2 = {id: 2, name: 'o', base_price: 200, max_capacity: 10, quantity: 0, total_price: 0};
  const options = [new Option(option1), new Option(option2)];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectOptionComponent,
        SpecifyOrderComponent,
      ],
      imports: [
        ...DEFAULT_IMPORTS,
        NgbModule,
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
});
