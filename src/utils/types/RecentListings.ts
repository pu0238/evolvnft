export interface RecentListings {
  listingId: string;
  owner: string;
  collection: string;
  tokenId: string;
  price: string;
  denom: string;
  openForOffers: boolean;
  normalizedPrice: string | undefined
  offers: any[]
}
