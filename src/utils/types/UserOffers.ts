export interface UserOffers {
  collection: string;
  from: string;
  offer: { denom: string; amount: string };
  tokenId: string;
}
