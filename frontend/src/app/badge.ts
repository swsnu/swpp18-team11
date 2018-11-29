export class Badge {
  constructor(args: Partial<Badge>) {
    Object.assign(this, args);
  }

  id: number;
  name: string;
  thumbnail: string;
}
