import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { DEFAULT_IMPORTS, DEFAULT_DUMB_IMPORTS } from '../testing';
import { MyCartService } from '../my-cart.service';
import { of } from 'rxjs';
import { MyCartItem } from '../my-cart-item';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let myCartServiceSpy;

  beforeEach(async(() => {
    myCartServiceSpy = jasmine.createSpyObj
    ('MyCartService', ['getMyCart', 'emptyMyCart']);
    myCartServiceSpy.getMyCart.and.returnValue(of([
      new MyCartItem({ myCartItemId: 1, purchasable: null })
    ]));
    myCartServiceSpy.emptyMyCart.and.returnValue(of().toPromise());

    TestBed.configureTestingModule({
      imports: [...DEFAULT_IMPORTS, ...DEFAULT_DUMB_IMPORTS],
      declarations: [ FooterComponent ],
      providers: [
        {provide: MyCartService, useValue: myCartServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get my cart when created', () => {
    component.ngOnInit();
    expect(myCartServiceSpy.getMyCart).toHaveBeenCalled();
    expect(component.myCartCount).toEqual(1);
  });

  it('emptyMyCart should show confirm and empty cart', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.emptyMyCart();
    expect(window.confirm).toHaveBeenCalled();
    expect(myCartServiceSpy.emptyMyCart).toHaveBeenCalled();
    expect(myCartServiceSpy.getMyCart).toHaveBeenCalled();
  });

  it('emptyMyCart should do nothing if confirm fails', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.emptyMyCart();
    expect(window.confirm).toHaveBeenCalled();
  });
});
