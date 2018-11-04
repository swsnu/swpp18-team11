export class Option {

  constructor(args: Partial<Option>) {
    Object.assign(this, args)
  }

  id: number
  name: string
  base_price: number
  max_capacity: number
  quantity: number = 0
  total_price: number = 0
}
