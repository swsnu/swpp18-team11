import { Purchasable } from './purchasable';

export class MyCartItem {
  constructor(args: MyCartItem) {
    Object.assign(this, args);
  }
  myCartItemId: number;
  purchasable: Purchasable;
}
