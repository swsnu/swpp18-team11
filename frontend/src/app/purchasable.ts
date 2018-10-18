import { Menu } from "./menu";

export class Purchasable extends Menu {
  constructor(
    public quantity: number = 0,
    public total_price: number = 0
  ){
    super()
  }
}
