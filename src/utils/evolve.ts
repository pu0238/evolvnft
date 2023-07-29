import {
  collectionManagerContractAddress,
  launchpadManagerContractAddress,
  marketplaceManagerContractAddress,
} from '../state/stateCache';
import {
  BLOCKCHAIN_SCAN_TXS,
  CARNISTER_API_URL,
  SYSTEM_CONTEXT_CONTRACT_ADDRESS,
} from './constant';
import { buildMintObject } from './metadata';
import type { CollectionEntitie } from './types/CollectionItem';
import type { RecentListings } from './types/RecentListings';
import type { UserCollections } from './types/UserCollections';
import { getArchwaySigner, getQueryClient } from './wallet';
import _ from 'lodash';

/*
 *
 *  ==== EvolveMetadata ====
 *
 */

export async function createEvolveCollection(
  accountAddress: string,
): Promise<number> {
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}`,
    {
      method: 'POST',
    },
  );
  return (await result.json()).collectionId;
}

export async function postEvolveMetadata(
  accountAddress: string,
  collectionId: number,
  arweaveHash: string,
): Promise<number> {
  const raw = JSON.stringify({
    arweave_hash: arweaveHash,
  });
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}`,
    {
      method: 'POST',
      body: raw,
    },
  );
  return (await result.json()).metadataId;
}

export async function postEvolveMetadatav2(
  accountAddress: string,
  collectionId: number,
  metadatas: { arweave_hash: string }[],
): Promise<number[]> {
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}`,
    {
      method: 'POST',
      body: JSON.stringify({ metadatas }),
    },
  );
  return (await result.json()).metadataIds;
}

export async function editEvolveMetadata(
  accountAddress: string,
  collectionId: number,
  metadataId: number,
  arweaveHash: string,
): Promise<number> {
  const raw = JSON.stringify({
    arweave_hash: arweaveHash,
  });
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}/${metadataId}`,
    {
      method: 'POST',
      body: raw,
    },
  );
  const res = await result.json();
  return res.metadataId;
}

export async function getNextMetadataId(
  accountAddress: string,
  collectionId: number,
): Promise<number> {
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}/next`,
    {
      method: 'GET',
    },
  );
  return (await result.json()).nextMetadataId;
}

/*
 *
 *  ==== CollectionManager ====
 *
 */

export async function getCollectionManager(): Promise<string> {
  const collectionManager = collectionManagerContractAddress.get();
  if (collectionManager) {
    return collectionManager;
  }
  const queryClient = await getQueryClient();
  const state: { address: string } = await queryClient.queryContractSmart(
    SYSTEM_CONTEXT_CONTRACT_ADDRESS,
    { get_collection_manager: {} },
  );
  collectionManagerContractAddress.set(state.address);
  return state.address;
}

export async function getCollectionsStats() {
  const queryClient = await getQueryClient();
  const collectionManagerContract = await getCollectionManager();

  return await queryClient.queryContractSmart(collectionManagerContract, {
    get_stats: {},
  });
}

export async function getCollectionsStatsForAddress(address: string) {
  const queryClient = await getQueryClient();
  const collectionManagerContract = await getCollectionManager();

  return await queryClient.queryContractSmart(collectionManagerContract, {
    get_user_stats: { address },
  });
}

export async function getWalletCollections(): Promise<
  void | CollectionEntitie[]
> {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const list_user_collections = {
    address: signerAddress,
  };

  const collectionManagerContract = await getCollectionManager();
  const data = await archwaySigner.queryContractSmart(
    collectionManagerContract,
    {
      list_user_collections,
    },
  );
  return data;
}

export async function getCollection(
  address: string,
): Promise<CollectionEntitie> {
  const queryClient = await getQueryClient();
  const get_collection = {
    address,
  };

  const collectionManagerContract = await getCollectionManager();
  const data = await queryClient.queryContractSmart(collectionManagerContract, {
    get_collection,
  });
  return data;
}

export async function mintNFTs(
  collectionAddress: string,
  filesToUpload: {
    [key: string]: {
      image?: Blob | undefined;
      metadata?: string | undefined;
    };
  },
  collection: CollectionEntitie,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const tokens = await buildMintObject(
    signerAddress,
    filesToUpload,
    collection as CollectionEntitie,
  );
  const mint_tokens = {
    address: collectionAddress,
    tokens,
  };
  const collectionManagerContract = await getCollectionManager();
  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    collectionManagerContract,
    { mint_tokens },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function setRewardsFee(
  collectionAddress: string,
  fee: number,
): Promise<void> {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const set_rewards_fee = {
    address: collectionAddress,
    fee,
  };

  const collectionManagerContract = await getCollectionManager();
  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    collectionManagerContract,
    { set_rewards_fee },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function applyForLanuchpad(
  collectionAddress: string,
  orderedMint: boolean,
  twitterUrl?: string,
  projectUrl?: string,
  discordUrl?: string,
): Promise<void> {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const apply_for_launchpad = {
    address: collectionAddress,
    twitter_url: twitterUrl === '' ? undefined : twitterUrl,
    project_url: projectUrl === '' ? undefined : projectUrl,
    discord_url: discordUrl === '' ? undefined : discordUrl,
    ordered_mint: orderedMint,
  };

  const collectionManagerContract = await getCollectionManager();
  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    collectionManagerContract,
    { apply_for_launchpad },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

/*
 *
 *  ==== LaunchpadManager ====
 *
 */

export async function getLaunchpadStatsForAddress(address: string) {
  const queryClient = await getQueryClient();
  const launchpadManager = await getLaunchpadManager();

  return await queryClient.queryContractSmart(launchpadManager, {
    get_user_stats: { address },
  });
}

export async function getAllocatedTokensNum(
  collectionAddress: string,
): Promise<number> {
  const queryClient = await getQueryClient();
  const launchpadManager = await getLaunchpadManager();
  const num: number = await queryClient.queryContractSmart(launchpadManager, {
    get_allocated_tokens_num: { address: collectionAddress },
  });
  return num;
}

export async function getLaunchpadManager(): Promise<string> {
  const launchpadManager = launchpadManagerContractAddress.get();
  if (launchpadManager) {
    return launchpadManager;
  }
  const queryClient = await getQueryClient();
  const state: { address: string } = await queryClient.queryContractSmart(
    SYSTEM_CONTEXT_CONTRACT_ADDRESS,
    { get_launchpad_manager: {} },
  );
  launchpadManagerContractAddress.set(state.address);
  return state.address;
}

export async function getLaunchpadEntries(
  start_from?: string,
  limit = 20,
): Promise<{
  finished?: any[];
  ongoing?: any[];
  upcoming?: any[];
  next: string;
}> {
  const queryClient = await getQueryClient();
  const launchpadManager = await getLaunchpadManager();
  const res = await queryClient.queryContractSmart(launchpadManager, {
    list_launchpad_entries: { limit, start_from },
  });

  return { ..._.groupBy(res.data, 'status'), next: res.nextPage };
}

export async function getLaunchpadEntrie(collectionAddress: string) {
  const queryClient = await getQueryClient();
  const launchpadManager = await getLaunchpadManager();
  const res = await queryClient.queryContractSmart(launchpadManager, {
    get_launchpad_entry: { address: collectionAddress },
  });

  return res;
}

export async function allocateTokens(
  collectionAddress: string,
  filesToUpload: {
    [key: string]: {
      image?: Blob | undefined;
      metadata?: string | undefined;
    };
  },
  collection: CollectionEntitie,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const tokens = await buildMintObject(
    signerAddress,
    filesToUpload,
    collection as CollectionEntitie,
  );
  const allocate_tokens = {
    address: collectionAddress,
    tokens,
  };
  const launchpadManagerContract = await getLaunchpadManager();
  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    launchpadManagerContract,
    { allocate_tokens },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function claimLaunchpadToken(
  collectionAddress: string,
  tokenAmount: string,
  denom: string,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const claim_token = {
    address: collectionAddress,
  };
  console.log(claim_token);
  const launchpadManagerContract = await getLaunchpadManager();
  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    launchpadManagerContract,
    { claim_token },
    'auto',
    undefined,
    [{ denom, amount: tokenAmount }],
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

/*
 *
 *  ==== Collection ====
 *
 */

export async function withdrawalRewards(
  collectionAddress: string,
): Promise<void> {
  const { signerAddress, archwaySigner } = await getArchwaySigner();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    collectionAddress,
    { pay_out_rewards: {} },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function getOwnedTokensIds(
  collectionAddress: string,
  ownerAddress: string,
): Promise<string[]> {
  const queryClient = await getQueryClient();

  const { tokens } = await queryClient.queryContractSmart(collectionAddress, {
    tokens: { owner: ownerAddress },
  });
  return tokens;
}

export async function getOwnedTokens(
  ownerAddress: string,
  page?: number,
): Promise<UserCollections> {
  const queryClient = await getQueryClient();

  const collectionManagerContract = await getCollectionManager();
  const result = await queryClient.queryContractSmart(
    collectionManagerContract,
    {
      list_owned_tokens: { address: ownerAddress, page },
    },
  );
  return result;
}

export async function getNftInfo(
  collectionAddress: string,
  tokenId: string,
): Promise<string> {
  const queryClient = await getQueryClient();

  const { token_uri } = await queryClient.queryContractSmart(
    collectionAddress,
    {
      nft_info: {
        token_id: tokenId,
      },
    },
  );
  return token_uri;
}

export async function getSpecificTokens(
  collectionAddress: string,
  tokenIds: string[],
): Promise<{ extension: any; token_uri: string }[]> {
  const queryClient = await getQueryClient();

  const res = await queryClient.queryContractSmart(collectionAddress, {
    specific_tokens: {
      ids: tokenIds,
    },
  });

  return res;
}

export async function listToken(
  collectionAddress: string,
  tokenId: string,
  tokenAmount: string,
  denom: string,
  openToOffers: boolean,
): Promise<void> {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const marketplaceManager = await getMarketplaceManager();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    collectionAddress,
    {
      send_nft: {
        contract: marketplaceManager,
        token_id: tokenId,
        msg: Buffer.from(
          JSON.stringify({
            price: { denom, amount: tokenAmount },
            open_to_offers: openToOffers,
          }),
        ).toString('base64'),
      },
    },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function sendToken(
  collectionAddress: string,
  tokenId: string,
  receiverAddress: string,
): Promise<void> {
  const { signerAddress, archwaySigner } = await getArchwaySigner();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    collectionAddress,
    {
      transfer_nft: {
        recipient: receiverAddress,
        token_id: tokenId,
      },
    },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}
/*
 *
 *  ==== MarketplaceManager ====
 *
 */

export async function getMarketplaceManager(): Promise<string> {
  const marketplaceManager = marketplaceManagerContractAddress.get();
  if (marketplaceManager) {
    return marketplaceManager;
  }
  const queryClient = await getQueryClient();
  const state: { address: string } = await queryClient.queryContractSmart(
    SYSTEM_CONTEXT_CONTRACT_ADDRESS,
    { get_marketplace_manager: {} },
  );
  marketplaceManagerContractAddress.set(state.address);
  return state.address;
}

export async function getRecentListings(): Promise<RecentListings[]> {
  const marketplaceManager = await getMarketplaceManager();
  const queryClient = await getQueryClient();
  const state = await queryClient.queryContractSmart(marketplaceManager, {
    get_recent_listings: {},
  });
  return state.reverse();
}

export async function getCollectionListings(
  collectionAddr: string,
): Promise<RecentListings[]> {
  const marketplaceManager = await getMarketplaceManager();
  const queryClient = await getQueryClient();
  const state = await queryClient.queryContractSmart(marketplaceManager, {
    get_collection_listings: {
      collection: collectionAddr,
    },
  });
  return state.reverse();
}

export async function purchaseToken(
  collectionAddr: string,
  tokenId: string,
  tokenAmount: string,
  denom: string,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const marketplaceManager = await getMarketplaceManager();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    marketplaceManager,
    {
      purchase: {
        collection: collectionAddr,
        token_id: tokenId,
      },
    },
    'auto',
    undefined,
    [{ denom, amount: tokenAmount }],
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function placeOffer(
  collectionAddr: string,
  tokenId: string,
  tokenAmount: string,
  denom: string,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const marketplaceManager = await getMarketplaceManager();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    marketplaceManager,
    {
      place_offer: {
        collection: collectionAddr,
        token_id: tokenId,
      },
    },
    'auto',
    undefined,
    [{ denom, amount: tokenAmount }],
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function getTokenOffers(
  collectionAddr: string,
  tokenId: string,
): Promise<any> {
  const marketplaceManager = await getMarketplaceManager();
  const queryClient = await getQueryClient();
  const state = await queryClient.queryContractSmart(marketplaceManager, {
    get_offers: {
      collection: collectionAddr,
      token_id: tokenId,
    },
  });
  return state;
}

export async function cancelOffer(
  collectionAddr: string,
  tokenId: string,
): Promise<any> {
  const marketplaceManager = await getMarketplaceManager();
  const { signerAddress, archwaySigner } = await getArchwaySigner();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    marketplaceManager,
    {
      cancel_offer: {
        collection: collectionAddr,
        token_id: tokenId,
      },
    },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function acceptOffer(
  collectionAddr: string,
  tokenId: string,
  fromAddress: string
): Promise<any> {
  const marketplaceManager = await getMarketplaceManager();
  const { signerAddress, archwaySigner } = await getArchwaySigner();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    marketplaceManager,
    {
      accept_offer: {
        collection: collectionAddr,
        token_id: tokenId,
        from: fromAddress
      },
    },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}

export async function closeTokenListing(
  collectionAddr: string,
  tokenId: string,
): Promise<any> {
  const marketplaceManager = await getMarketplaceManager();
  const { signerAddress, archwaySigner } = await getArchwaySigner();

  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    marketplaceManager,
    {
      close_listing: {
        collection: collectionAddr,
        token_id: tokenId,
      },
    },
    'auto',
  );
  console.log(`${BLOCKCHAIN_SCAN_TXS}${transactionHash}`);
}