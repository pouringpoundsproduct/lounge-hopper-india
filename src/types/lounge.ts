
export interface Lounge {
  id: number;
  name: string;
  airport: string;
  city: string;
  state: string;
  location: string;
  hours: string;
  amenities: string[];
  guestPolicy: string;
  paidAccess?: string;
  rating: string;
  reviews: string;
  image: string;
  eligibleCards: string[];
  networks: string[];
}

export interface CreditCard {
  id: number;
  name: string;
  logo?: string;
  network?: string;
}

export interface Network {
  name: string;
  cardCount: number;
}
