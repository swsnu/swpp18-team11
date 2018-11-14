import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartDialogComponent } from './my-cart-dialog.component';

describe('MyCartDialogComponent', () => {
  let component: MyCartDialogComponent;
  let fixture: ComponentFixture<MyCartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
