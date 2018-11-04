import { TestBed } from '@angular/core/testing';

import { MyCartService } from './my-cart.service';

describe('MyCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyCartService = TestBed.get(MyCartService);
    expect(service).toBeTruthy();
  });
});

// Describe Storage
// it loadStorage should localStorage.getItem
//   if localStorage is empty, return []
//   else return JSON.parse

// it saveStorage should localStorage.setItem

// Describe functions
// it getTotalPrice should return totalPrice
//   (example with test_cart)
// it isEmpty should return length
//    (example with test_cart)
// it removePurchasable should remove purchasable with given index
//    (example with test_cart)

// Describe methods
// it getMyCart should return my_cart
// it setMyCart should call saveStorage
// it addMyCart should add Purchasable
//    and call saveStorage
//    (example with test_cart)
// it updateMyCart should call setMyCart
// it emptyMyCart should save []
