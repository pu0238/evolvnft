import type { Offer } from "./Offer";

export interface UserOffers extends Partial<Offer> {
  collection: string;
  token_id: string;
}
