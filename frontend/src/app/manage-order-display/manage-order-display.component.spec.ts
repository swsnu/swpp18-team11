import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderDisplayComponent } from './manage-order-display.component';

describe('ManageOrderDisplayComponent', () => {
  let component: ManageOrderDisplayComponent;
  let fixture: ComponentFixture<ManageOrderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrderDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
