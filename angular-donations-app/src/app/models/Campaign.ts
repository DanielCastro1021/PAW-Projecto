export class Campaign {
  __id: string;
  name: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  iban: string;
  responsibles: [string];
  status: string;
  logo: string;
}
