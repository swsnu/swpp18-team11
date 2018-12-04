import { TestBed } from '@angular/core/testing';

import { MyCartService } from './my-cart.service';
import { MyCartComponent } from './my-cart/my-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Purchasable } from './purchasable';
import { Router } from '@angular/router';
import { Option } from './option';
import { MyCartItem } from './my-cart-item';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('MyCartService', () => {

  let myCartService: MyCartService;
  let testMyCartItem: MyCartItem;
  let testPurchasable: Purchasable;
  let testOption: Option;
  let testMyCart: MyCartItem[];
  let routerSpy;
  let httpClientSpy;

  beforeEach(() => {
    testPurchasable = new Purchasable({
      id: 1,
      name: 'Hamburger',
      thumbnail: 'jpg',
      base_price: 10,
      options: [],
      badges: [],
      total_price: 20,
      quantity: 2
    });
    testOption = new Option({
      id: 2,
      name: 'Cheese',
      base_price: 5,
      quantity: 10,
    });
    testMyCartItem = {
      myCartItemId: 1,
      purchasable: testPurchasable
    };
    testMyCart = [testMyCartItem];
  });

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of({ success: true, data: { purchasables: testMyCart }}),
      delete: of(null),
      post: of(null),
      patch: of({ success: true, data: testMyCartItem }),
    });

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        MyCartService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ],
    })
      .compileComponents();

    spyOn(console, 'error');
    myCartService = TestBed.get(MyCartService);
  });


  it('getTotalPrice should return myCart total price', () => {
    myCartService.getTotalPrice().then(
      totalPrice => {
        expect(totalPrice).toEqual(20);
      }
    );
  });

  it('getMyCart should return Observable myCart[]', () => {
    myCartService.getMyCart().toPromise().then(
      myCart => {
        expect(myCart).toEqual(testMyCart);
      });
  });

  it('emptyMyCartItem should remove entire items', () => {
    myCartService.emptyMyCart();
    myCartService.getMyCart().toPromise().then(
      myCart => expect(myCart.length).toEqual(0)
    );
  });

  it('removeMyCartItem should remove item from myCart', () => {
    myCartService.removeMyCartItem(testMyCartItem);
    myCartService.getMyCart().toPromise().then(
      myCart => expect(myCart.length).toEqual(0)
    );
  });

  it('addMyCart should add an item into my cart', () => {
    myCartService.addMyCart(testPurchasable);
    myCartService.getMyCart().toPromise().then(
      myCart => expect(myCart.length).toEqual(2)
    );
  });

  it('patchMyCartQty should change myCartItems qty', () => {
    myCartService.patchMyCartQty(testMyCartItem, 99).then(
      (patchedItem: MyCartItem) =>
        expect(patchedItem.purchasable.quantity).toEqual(99)
    );
  });

  it('patchMyCartOption should change myCartItems options', () => {
    myCartService.patchMyCartOptions(testMyCartItem, [testOption]).then(
      (patchedItem: MyCartItem) =>
        expect(patchedItem.purchasable.options).toEqual([testOption])
    );
  });
});

