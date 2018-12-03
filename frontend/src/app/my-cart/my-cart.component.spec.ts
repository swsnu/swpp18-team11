import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCartComponent } from './my-cart.component';
import { DEFAULT_DUMB_IMPORTS, DEFAULT_IMPORTS } from '../testing';

import { Router } from '@angular/router';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyCartService } from '../my-cart.service';
import { Purchasable } from '../purchasable';
import { Option } from '../option';
import { MyCartDialogComponent } from '../my-cart-dialog/my-cart-dialog.component';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { MyCartItem } from '../my-cart-item';
import { Observable, of } from 'rxjs';
import { SelectFoodComponent } from '../select-food/select-food.component';
import { MenuDataService } from '../menu-data.service';

describe('MyCartComponent', () => {
  let component: MyCartComponent;
  let fixture: ComponentFixture<MyCartComponent>;
  let testPurchasable: Purchasable;
  let testMyCartItem: MyCartItem;
  let testMyCart$: Observable<MyCartItem[]>;
  let testMyCart: MyCartItem[];
  let myCartServiceSpy;
  let routerSpy;
  let locationSpy;

  beforeEach(() => {
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
    testMyCartItem = new MyCartItem({
      myCartItemId : 1,
      purchasable : testPurchasable
    });
    testMyCart = [testMyCartItem];
    testMyCart$ = of(testMyCart);
  });

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    myCartServiceSpy = jasmine.createSpyObj('MyCartService',
          [
            'getMyCart', 'getTotalPrice', 'patchMyCartQty',
            'patchMyCartOptions', 'removeMyCartItem', 'emptyMyCart'
          ]);
    myCartServiceSpy.getMyCart.and.returnValue(testMyCart$);
    myCartServiceSpy.getTotalPrice.and.returnValue(of(20).toPromise());
    myCartServiceSpy.patchMyCartQty.and.returnValue(of({}).toPromise());
    myCartServiceSpy.patchMyCartOptions.and.returnValue(of({}).toPromise());
    myCartServiceSpy.removeMyCartItem.and.returnValue(of({}).toPromise());

    TestBed.configureTestingModule({
      declarations: [
        MyCartComponent,
        MyCartDialogComponent,
        SelectOptionComponent,
      ],
      imports: [
        NgbModule,
        ...DEFAULT_IMPORTS
      ],
      providers: [
        { provide: Router, useValue: routerSpy},
        { provide: Location, useValue: locationSpy},
        { provide: MyCartService, useValue: myCartServiceSpy },
        { provide: APP_BASE_HREF, useValue : '/' } // prevent error 'root' undefined)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getMyCart, getTotalPrice, getMyCartCount,', async((() => {
    component.ngOnInit();
    expect(myCartServiceSpy.getMyCart).toHaveBeenCalled();
    expect(myCartServiceSpy.getTotalPrice).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(component.myCart$).toEqual(testMyCart$);
      expect(component.totalPrice).toEqual(20);
    });
  })));

  it('increment should increase myCartItems quantity', async(() => {
    component.increment(testMyCartItem);
    fixture.whenStable().then(() => {
      expect(testMyCartItem.purchasable.quantity).toEqual(2);
      expect(myCartServiceSpy.patchMyCartQty).toHaveBeenCalledWith(testMyCartItem, 2);
    });
  }));

  it('decrement should decrease myCartItems quantity', async(() => {
    testMyCartItem.purchasable.quantity = 3;
    component.decrement(testMyCartItem);
    fixture.whenStable().then(() => {
      expect(testMyCartItem.purchasable.quantity).toEqual(2);
      expect(myCartServiceSpy.patchMyCartQty).toHaveBeenCalledWith(testMyCartItem, 2);
    });
  }));

  it('removeMyCartItem should remove myCartItem', async(() => {
    component.removeMyCartItem(testMyCartItem);
    fixture.whenStable().then(() => {
      expect(myCartServiceSpy.removeMyCartItem).toHaveBeenCalledWith(testMyCartItem);
    });
  }));

  it('emptyMyCart should empty myCart', (() => {
    component.emptyCart();
    expect(myCartServiceSpy.emptyMyCart).toHaveBeenCalled();
  }));
});
