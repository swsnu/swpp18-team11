import { Menu } from './menu';
import { Option } from './option';
import { Badge } from './badge';

export class Purchasable implements Menu {
  id: number;
  name: string;
  thumbnail: string;
  base_price: number;
  quantity = 1;
  total_price: number;
  options: Option[];
  badges: Badge[];

  constructor(args: Partial<Purchasable>) {
    Object.assign(this, args);
    this.base_price = Math.floor(this.base_price);
    this.options.map(option => {
      if (option instanceof Option) { // to bypass the optionStub in my-order-component.spec.ts
        option.assignPurchasable(this);
      }
    });
    this.updateTotalPrice();
  }
  increment(): void {
    this.quantity += 1;
    this.updateTotalPrice();
  }
  decrement(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
    this.updateTotalPrice();
  }
  updateTotalPrice(): void {
    const optionPriceSum = this.options.map(option => option.total_price).reduce((a, b) => a + b, 0);
    this.total_price = this.quantity * (this.base_price + optionPriceSum);
  }
  hasOptions(): boolean {
    if (!this.options) {    // check if no options at all
      return false;
    } else if (this.options.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      thumbnail: this.thumbnail,
      base_price: this.base_price,
      quantity: this.quantity,
      total_price: this.total_price,
      options: this.options.map(option => option.toJSON())
    };
  }
}

