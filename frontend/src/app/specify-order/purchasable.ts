import { Option } from './option'

export class Purchasable {
  id: number;
  name: string;
  thumbnail: string;
  base_price: number;
  options: Option[];
  quantity: number;
  total_price: number;
}
