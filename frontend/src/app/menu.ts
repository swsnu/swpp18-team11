import { Option } from "./option";

export interface Menu {
  id: number
  name: string
  thumbnail: string
  base_price: number
  options: Option[]
}
