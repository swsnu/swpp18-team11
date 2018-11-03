import { TestBed } from '@angular/core/testing';

import { MyCartService } from './my-cart.service';
import { MyCartComponent } from "./my-cart/my-cart.component";
import { RouterTestingModule } from "@angular/router/testing";
import {Purchasable} from "./purchasable";
import {Router} from "@angular/router";
import {Option} from "./option";

describe('MyCartService', () => {

  let myCartService: MyCartService
  let testPurchasable
  let testMyCart: Purchasable[]
  let routerSpy
  let testStorage = {}

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        MyCartService,
        { provide: Router, useValue: routerSpy }
      ],
    })
      .compileComponents()

    spyOn(localStorage, 'getItem').and.callFake((key:string)=>{
      return testStorage[key] || null
    })
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string)=>{
      return testStorage[key] = <string> value
    })
    spyOn(console, 'error')

    myCartService = TestBed.get(MyCartService);
    testPurchasable = new Purchasable({
      id: 1,
      name: 'Hamburger',
      thumbnail: 'jpg',
      base_price: 10,
      options: [],
      total_price: 10,
      quantity: 1
    })
    testMyCart = [testPurchasable]
    testStorage['myCart'] = JSON.stringify(testMyCart) // initialize local storage
  })

  it('getMyCartCount should return myCart count', ()=> {
    let count = myCartService.getMyCartCount()
    expect(localStorage.getItem).toHaveBeenCalledWith('myCart')
    expect(count).toEqual(testMyCart.length)
  })

  it('getTotalPrice should return myCart total price', ()=>{
    let returnedPrice = myCartService.getTotalPrice()
    let calculatedPrice = 0
    for (let purchasable of testMyCart){
      calculatedPrice += purchasable.total_price
    }
    expect(localStorage.getItem).toHaveBeenCalledWith('myCart')
    expect(returnedPrice).toEqual(calculatedPrice)
  })

  it('isEmpty should return myCart.isEmpty', ()=>{
    let isEmpty = myCartService.isEmpty()
    expect(localStorage.getItem).toHaveBeenCalledWith('myCart')
    expect(isEmpty).toEqual(false)

    testStorage = {}
    isEmpty = myCartService.isEmpty()
    expect(localStorage.getItem).toHaveBeenCalledWith('myCart')
    expect(isEmpty).toEqual(true)
  })

  it('removePurchasable should remove item from myCart', ()=>{
    myCartService.setMyCart([testPurchasable])
    myCartService.removePurchasable(0)
    expect(myCartService.getMyCart()).toEqual([])
  })

  it('removePurchasable should not remove if index is wrong', ()=>{
    myCartService.removePurchasable(999)
    expect(console.error).toHaveBeenCalledWith('Remove index out of bound')
  })

  it('getMyCart should return loadStorage', ()=>{
    let getCart = myCartService.getMyCart()
    expect(localStorage.getItem).toHaveBeenCalledWith('myCart')
    expect(getCart).toEqual(testMyCart)
  })

  it('getMyCart should return empry array if nothing stored', ()=>{
    testStorage = {}
    let getCart = myCartService.getMyCart()
    expect(localStorage.getItem).toHaveBeenCalledWith('myCart')
    expect(getCart).toEqual([])
  })

  it('setMyCart should call saveStorage', ()=>{
    let testMyCartAnother: Purchasable[] = [
      testPurchasable, testPurchasable
    ]
    myCartService.setMyCart(testMyCartAnother)
    expect(localStorage.setItem).toHaveBeenCalledWith('myCart',
                                                      JSON.stringify(testMyCartAnother))
    expect(myCartService.getMyCart()).toEqual(testMyCartAnother)
  })

  it('addMyCart should add item into my cart and saveStorge', ()=>{
    let testMyCartAdded : Purchasable[] = [
      testPurchasable, testPurchasable
    ]
    myCartService.setMyCart(testMyCart)
    myCartService.addMyCart(testPurchasable)
    expect(localStorage.setItem).toHaveBeenCalledWith('myCart',
      JSON.stringify(testMyCartAdded))
    expect(myCartService.getMyCart()).toEqual(testMyCartAdded)
  })

  it('updateMyCart should call setMyCart', ()=>{
    myCartService.updateMyCart([])
    expect(localStorage.setItem).toHaveBeenCalledWith('myCart', JSON.stringify([]))
  })

  it('emptyMyCart should empty localStorage', ()=>{
    myCartService.emptyMyCart()
    expect(localStorage.setItem).toHaveBeenCalledWith('myCart', JSON.stringify([]))
  })
});

