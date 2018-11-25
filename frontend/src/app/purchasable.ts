import { Menu } from './menu';
import { Option } from './option';
import { Badge } from './badge';

export class Purchasable implements Menu {
  constructor(args: Partial<Purchasable>) {
    Object.assign(this, args);
  }

  id: number;
  name: string;
  thumbnail: string;
  base_price: number;
  options: Option[];
  badges: Badge[];

  quantity = 0;
  total_price = 0;
}

