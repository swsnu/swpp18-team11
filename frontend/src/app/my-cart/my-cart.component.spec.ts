import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCartComponent } from './my-cart.component';

import { Router } from '@angular/router';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyCartService } from '../my-cart.service';
import { Purchasable } from '../purchasable';
import { Option } from '../option';
import { SelectOptionComponent } from '../select-option/select-option.component';

describe('MyCartComponent', () => {
  let component: MyCartComponent;
  let fixture: ComponentFixture<MyCartComponent>;
  let testPurchasable: Purchasable;
  let testMyCart: Purchasable[];
  let myCartServiceSpy;
  let routerSpy;
  let locationSpy;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    myCartServiceSpy = jasmine.createSpyObj('MyCartService',
          [
            'isEmpty', 'getMyCart', 'setMyCart', 'getTotalPrice',
            'updateMyCart', 'removePurchasable', 'emptyMyCart'
          ]);
    myCartServiceSpy.getMyCart.and.returnValue(testMyCart);
    myCartServiceSpy.getTotalPrice.and.returnValue(20);
    myCartServiceSpy.isEmpty.and.returnValue(false); // default

    TestBed.configureTestingModule({
      declarations: [
        MyCartComponent,
        SelectOptionComponent
      ],
      imports: [
    //    RouterTestingModule,
        NgbModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy},
        { provide: Location, useValue: locationSpy},
        { provide: MyCartService, useValue: myCartServiceSpy },
        { provide: APP_BASE_HREF, useValue : '/' } // prevent error 'root' undefined)
      ]
    })
      .compileComponents();

    // initial settings
    testPurchasable = new Purchasable({
      id: 1,
      name: 'Hamburger',
      thumbnail: 'jpg',
      base_price: 10,
      options: [],
      total_price: 10,
      quantity: 1
    });
    testMyCart = [testPurchasable, testPurchasable];
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should check if myCart is empty', () => {
    // empty cart
    myCartServiceSpy.isEmpty.and.returnValue(true);
    component.ngOnInit();

    routerSpy = fixture.debugElement.injector.get(Router);
    const navigateSpy = routerSpy.navigate as jasmine.Spy;
    expect(navigateSpy).toHaveBeenCalledWith(['/order']);
  });

  it('updateTotalPrice should call myCartService.getTotalPrice', () => {
    component.updateTotalPrice();
    expect(myCartServiceSpy.getTotalPrice).toHaveBeenCalled();
    expect(component.totalPrice).toEqual(myCartServiceSpy.getTotalPrice());
  });

  it('updateMyCart should set myCart and updateTotalPrice', () => {
    const testMyCartAnother = [testPurchasable];
    component.updateMyCart(testMyCartAnother);
    expect(component.myCart).toEqual(testMyCartAnother);
    expect(myCartServiceSpy.getTotalPrice).toHaveBeenCalled();
  });

  it('getMyCart should change myCart value', () => {
    component.getMyCart();
    expect(myCartServiceSpy.getMyCart).toHaveBeenCalled();
    expect(component.myCart).toEqual(myCartServiceSpy.getMyCart());
  });

  it('selectIndex should set selectedIndex', () => {
    component.selectedIndex = 1;
    component.selectIndex(2);
    expect(component.selectedIndex).toEqual(2);
  });

  it('hasOptions should check Purchasable options', () => {
    // option undefined
    const optionUndefinedPurchasable = new Purchasable({
      id: 2, name: 'noOption', total_price: 10
    });
    expect(component.hasOptions(optionUndefinedPurchasable)).toEqual(false);
    // option empty array
    expect(component.hasOptions(testPurchasable)).toEqual(false);
    // has potions
    const optionPurchasable = new Purchasable({
      id: 3, name: 'yesOption', options: [new Option({}), new Option({})]
    });
    expect(component.hasOptions(optionPurchasable)).toEqual(true);
  });

  it('increment should update purchasable quantity', () => {
    component.myCart = testMyCart;
    // fail: more than maximum quantity case
    component.myCart[0].quantity = 100;
    component.increment(0);
    expect(component.myCart[0].quantity).toEqual(100);
    // success
    component.myCart[0].quantity = 1;
    component.increment(0);
    expect(component.myCart[0].quantity).toEqual(2);
    // updateTotalPrice of Product
    expect(component.myCart[0].total_price).toEqual(20);
    // updateTotalPrice of myCart
    expect(myCartServiceSpy.updateMyCart).toHaveBeenCalled();
    expect(myCartServiceSpy.getTotalPrice).toHaveBeenCalled();
  });

  it('decrement should update purchasable quantity', () => {
    component.myCart = testMyCart;
    // less than minimum quantity case
    component.myCart[0].quantity = 0;
    component.decrement(0);
    expect(component.myCart[0].quantity).toEqual(0);
    // success
    component.myCart[0].quantity = 2;
    component.decrement(0);
    expect(component.myCart[0].quantity).toEqual(1);
    // updateTotalPrice of Product
    expect(component.myCart[0].total_price).toEqual(10);
    // updateTotalPrice of myCart
    expect(myCartServiceSpy.updateMyCart).toHaveBeenCalled();
    expect(myCartServiceSpy.getTotalPrice).toHaveBeenCalled();
  });

  it('updateOptionChange should update purchasable options', () => {
    const newOptions: Option[] = [new Option({total_price: 100})];
    component.selectedIndex = 0;
    component.updateOptionChange(newOptions);
    // updatePurchasablePrice called
    expect(component.myCart[0].total_price).toEqual(110);
    // myCartService.updateMyCart called
    expect(myCartServiceSpy.updateMyCart).toHaveBeenCalled();
  });

  it('removePurchasable should remove purchasable from myCart', () => {
    component.removePurchasable(0);
    expect(myCartServiceSpy.removePurchasable).toHaveBeenCalledWith(0);
    expect(myCartServiceSpy.getMyCart).toHaveBeenCalled();
    expect(myCartServiceSpy.isEmpty).toHaveBeenCalled();
  });

  it('removePurchasable navigates to order page if myCart became empty', () => {
    // remove to make myCart empty case
    myCartServiceSpy.isEmpty.and.returnValue(true);
    component.removePurchasable(0);
    expect(myCartServiceSpy.removePurchasable).toHaveBeenCalledWith(0);
    expect(myCartServiceSpy.getMyCart).toHaveBeenCalled();
    expect(myCartServiceSpy.isEmpty).toHaveBeenCalled();
    // send back to select-food page
    routerSpy = fixture.debugElement.injector.get(Router);
    const navigateSpy = routerSpy.navigate as jasmine.Spy;
    expect(navigateSpy).toHaveBeenCalledWith(['/order']);
  });

});

  function totalPrice (cart: Purchasable[]): number {
    let price = 0;
    for (const purchasable of cart) {
      price += purchasable.total_price;
    }
    return price;
  }

  @Component({
    selector: 'app-select-option',
    template: ''
  })
  class MockSelectOptionComponent {
    options: Option[];
  }
