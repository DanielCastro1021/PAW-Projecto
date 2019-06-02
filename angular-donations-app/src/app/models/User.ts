export class User {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  nif: number;
  iban: string;
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
