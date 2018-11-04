import { Menu } from "./menu";
import {Option} from "./option";

export class Purchasable implements Menu {

  constructor(args: Purchasable){
    Object.assign(this, args)
  }
  // properties of interface Menu
  id: number
  name: string
  thumbnail: string
  base_price: number
  options: Option[]

  public quantity: number = 0
  public total_price: number = 0
}

