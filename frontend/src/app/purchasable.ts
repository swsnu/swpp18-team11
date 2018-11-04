import { Menu } from "./menu";
import { Option } from "./option";

export class Purchasable extends Menu {
  constructor(
    public quantity: number = 0,
    public total_price: number = 0
  ){
    super()
  }

  updateTotalPrice(): void {
    let optionPrice = 0;
    for (const option of this.options) {
      optionPrice += option.total_price;
    }
    this.total_price = this.quantity * (this.base_price + optionPrice);
  }
}
