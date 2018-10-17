import { Option } from './option'

export class Purchasable {

  id: number;
  name: string;
  thumbnail: string;
  base_price: number;
  options: Option[];
  quantity: number;
  total_price: number;

  updateTotalPrice(): void {
    let optionPrice = 0;
    for (const option of this.options) {
      optionPrice += option.base_price * option.quantity
    }
    this.total_price = this.quantity * (this.base_price + optionPrice);
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
    this.updateTotalPrice();
  }

  increment(): void {
    if (this.quantity < 100) {
      this.quantity += 1;
    }
    this.updateTotalPrice();
  }
}
