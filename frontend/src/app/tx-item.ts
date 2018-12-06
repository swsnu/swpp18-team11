import { Purchasable } from './purchasable';

class TxItemOption {
  optionName: string;
  basePrice: number;
  qty: number;
  totalPrice: number;

  constructor (args: {
    optionName: string,
    basePrice: number,
    qty: number,
    totalPrice: number
  }) {
    this.optionName = args.optionName;
    this.basePrice = args.basePrice;
    this.qty = args.qty;
    this.totalPrice = args.totalPrice;
  }
}

class TxItem {
  purchasable: Purchasable;
  purchasableName: string;
  purchasableBasePrice: number;
  qty: number;
  price: number;
  options: TxItemOption[];
  totalPrice: number;
  createdAt: string;
  state: string;

  constructor (args: {
    purchasable: Purchasable;
    purchasableName: string;
    purchasableBasePrice: number;
    qty: number;
    price: number;
    options: TxItemOption[];
    totalPrice: number;
    createdAt: string;
    state: string;
  }) {
    this.purchasable = args.purchasable;
    this.purchasableName = args.purchasableName;
    this.purchasableBasePrice = args.purchasableBasePrice;
    this.qty = args.qty;
    this.price = args.price;
    this.options = args.options.map(option => this.loadTxItemOption(option));
    this.createdAt = args.createdAt;
    this.state = args.state;
    this.totalPrice = +args.totalPrice;
    for (const option of this.options) {
      this.totalPrice += +option.totalPrice;
    }
  }
  loadTxItemOption(option): TxItemOption {
    return new TxItemOption({
      optionName: option.name,
      basePrice: option.base_price,
      qty: option.qty,
      totalPrice: option.total_price
    });
  }
}

export { TxItem, TxItemOption };
