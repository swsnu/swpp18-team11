import { Purchasable } from './purchasable';

export class Option {
  id: number;
  name: string;
  base_price: number;
  max_capacity: number;
  quantity = 0;
  total_price = 0;
  purchasable: Purchasable;

  constructor(args: Partial<Option>) {
    Object.assign(this, args);
    this.base_price = Math.floor(this.base_price);
    this.updateTotalPrice();
  }
  assignPurchasable(purchasable: Purchasable): void {
    this.purchasable = purchasable;
  }
  increment(): void {
    this.quantity += 1;
    this.updateTotalPrice();
    if (this.purchasable) {
      this.purchasable.updateTotalPrice();
    }

  }
  decrement(): void {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
    this.updateTotalPrice();
    if (this.purchasable) {
      this.purchasable.updateTotalPrice();
    }
  }
  updateTotalPrice(): void {
    this.total_price = this.quantity * this.base_price;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      base_price: this.base_price,
      max_capacity: this.max_capacity,
      quantity: this.quantity,
      total_price: this.total_price
    };
  }
}
