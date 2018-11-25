import { Option } from './option';
import { Badge } from './badge';

export interface Menu {
  id: number;
  name: string;
  thumbnail: string;
  base_price: number;
  options: Option[];
  badges: Badge[];
}
