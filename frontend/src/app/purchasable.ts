import { Menu } from './menu';
import { Option } from './option';

export class Purchasable implements Menu {
  constructor(args: Partial<Purchasable>) {
    Object.assign(this, args);
  }

  id: number;
  name: string;
  thumbnail: string;
  base_price: number;
  options: Option[];

  quantity = 0;
  total_price = 0;
}


