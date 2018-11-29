import { Purchasable } from "./purchasable";

export class MyCartItem extends Purchasable {
  constructor(args: MyCartItem) {
    const purchasableArgs = {
      id: args.id,
      name: args.name,
      thumbnail: args.thumbnail,
      base_price: args.base_price,
      options: args.options
    };
    super(purchasableArgs);
    this.myCartItemId = args.myCartItemId;
  }

  myCartItemId: number;
}
