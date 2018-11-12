export class Franchise {
  id: number;
  name: string;

  constructor(args: Franchise) {
    Object.assign(this, args);
  }
}
