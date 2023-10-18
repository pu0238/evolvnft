import type { Coin } from "cosmwasm";

export interface UserLaunchpadStats {
    coins_spent: Coin[],
    collections_launched: number
    tokens_claimed: number
}