import type { CollectionToken } from "./CollectionToken";

export interface CollectionData {
  address: string;
  description: string;
  name: string;
  symbol: string;
  thumbnail: null | string;
  limit: null | number;
  open: boolean;
  owner: string;
  ic_collection_id: null | number;
  tokens?: CollectionToken[]
  userTokens?: CollectionToken[]
  rewards_percentage_fee?: number; //2500 = 25%
}
