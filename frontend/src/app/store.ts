export class Store {
  id: number;
  name: string;
  location: { lng: number, lat: number };
  franchiseId: any;
  timezone: string;

  constructor(args: Store) {
    Object.assign(this, args);
  }
}
