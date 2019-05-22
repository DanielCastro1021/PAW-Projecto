export class User {
  __id: string;
  username: string;
  password: string;
  fullname: string;
  role: string;
  coordinates: Coordinates;
  address: string;
  constructor() {
    this.coordinates = new Coordinates();
  }
}

class Coordinates {
  latitude: number;
  longitude: number;
}
