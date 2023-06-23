import type { CollectionToken } from './CollectionToken';

export interface CollectionEntitie {
  address: string;
  description: string;
  name: string;
  symbol: string;
  thumbnail: null | string;
  limit: null | number;
  open: boolean;
  owner: string;
  ic_collection_id: null | number;
  tokens: null | { [key: string]: CollectionToken };
  accumulated_rewards?: { [key: string]: string };
  rewards_percentage_fee?: number; //2500 = 25%
}
