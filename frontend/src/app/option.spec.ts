import { async, TestBed } from '@angular/core/testing';

import { Purchasable } from './purchasable';
import { Option } from './option';

describe('Option', () => {
  let purchasable: Purchasable;
  let options: Option[];

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
      total_price: 1000,
      options: [new Option({
        id: 1,
        name: 'ASDF',
        base_price: 50,
        max_capacity: 2,
        quantity: 0,
        total_price: 100,
      } as any)]
    });
    options = purchasable.options;
  });

  it('should be created', () => {
    expect(purchasable).toBeDefined();
    expect(options).toBeDefined();
  });
  it('should increment and decrement', () => {
    const option = options[0];
    option.decrement();
    expect(option.quantity).toEqual(0);
    expect(purchasable.total_price).toEqual(1000);
    option.increment();
    expect(option.quantity).toEqual(1);
    expect(purchasable.total_price).toEqual(1050);
    option.decrement();
    expect(option.quantity).toEqual(0);
    expect(purchasable.total_price).toEqual(1000);
  });
  it('should convert to JSON', () => {
    const option = options[0];
    expect(option.toJSON()).toEqual({
      id: option.id,
      name: option.name,
      base_price: option.base_price,
      max_capacity: option.max_capacity,
      quantity: option.quantity,
      total_price: option.total_price,
    });
  });
});
