import type { CollectionData } from './CollectionData';

export interface CollectionLaunchpadEntrie {
  banner_url: string;
  collection?: CollectionData;
  cost_denom: string;
  discord_url: string;
  end_time: number;
  max_tokens_per_wallet: number;
  preview: any[];
  project_url: string;
  queued_tokens: number;
  sold_tokens: number;
  start_time: number;
  status: string;
  token_cost: string;
  total_tokens: number;
  twitter_url: string;
  whitelist?: any;
}
