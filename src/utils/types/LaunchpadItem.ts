export interface LaunchpadItem {
  costDenom: string;
  name: string;
  description: string;
  endTime: string;
  startTime: string;
  discordUrl: string;
  twitterUrl: string;
  projectUrl: string;
  thumbnail: string;
  tokenCost: string;
  totalTokens: number;
  preview: any[];
  soldTokens: number;
  address: string
  whitelistEnd: string | null
}
