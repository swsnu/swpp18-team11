import { async, TestBed } from '@angular/core/testing';

import { Purchasable } from './purchasable';
import { Option } from './option';

describe('Purchasable', () => {
  let purchasable: Purchasable;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ Purchasable ]
    });
    purchasable = new Purchasable({
      id: 1,
      name: 'pur',
      thumbnail: '',
      base_price: 1000,
      quantity: 1,
      total_price: 1200,
      options: [new Option({
        id: 1,
        name: 'ASDF',
        base_price: 50,
        max_capacity: 2,
        quantity: 2,
        total_price: 100,
      } as any)]
    });
  });

  it('should be created', () => {
    expect(purchasable).toBeDefined();
  });
  it('should increment and decrement', () => {
    purchasable.decrement();
    expect(purchasable.quantity).toEqual(1);
    purchasable.increment();
    expect(purchasable.quantity).toEqual(2);
    purchasable.decrement();
    expect(purchasable.quantity).toEqual(1);
  });
  it('should check if the purchasable has option', () => {
    expect(purchasable.hasOptions()).toEqual(true);
    purchasable.options = [];
    expect(purchasable.hasOptions()).toEqual(false);
  });
  it('should convert to JSON', () => {
    expect(purchasable.toJSON()).toEqual({
        id: purchasable.id,
        name: purchasable.name,
        thumbnail: purchasable.thumbnail,
        base_price: purchasable.base_price,
        quantity: purchasable.quantity,
        total_price: purchasable.total_price,
        options: purchasable.options.map(option => option.toJSON())
    });
  });
});
