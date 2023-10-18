import { useStore } from '@nanostores/vue';
import {
  collectionManagerState,
  launchpadManagerState,
  marketplaceManagerState,
} from '../state/stateCache';
import {
  BLOCKCHAIN_SCAN_TXS,
  CARNISTER_API_URL,
  SYSTEM_CONTEXT_CONTRACT_ADDRESS,
} from './constant';
import {
  getCollectionManagerState,
  getCollectionState,
  getLaunchpadManagerState,
  getMarketplaceManagerState,
  getSystemContextState,
} from './evolveStateQuery';
import { buildMintObject } from './metadata';
import type { CollectionEntitie } from './types/CollectionEntitie';
import type { RecentListings } from './types/RecentListings';
import type { UserCollections } from './types/UserCollections';
import type { UserListings } from './types/UserListings';
import type { UserOffers } from './types/UserOffers';
import { getArchwaySigner, getQueryClient } from './wallet';
import _ from 'lodash';
import {
  findAllInMap,
  findInMap,
  findMapKeys,
  findMapValues,
  findVar,
  normalizeMap,
} from './ contractStateManager';
import type { CollectionManagerState } from './types/CollectionManagerState';
import type { CollectionUserStats } from './types/CollectionUserStats';
import type { CollectionData } from './types/CollectionData';
import BigNumber from 'bignumber.js';
import type { CollectionToken } from './types/CollectionToken';
import { ownedUserCollections, ownedUserTokens } from '../state/dashboard';
import type { Listing } from './types/Listing';
import type { MintEvent } from './types/MintEvent';
import type { CollectionLaunchpadParam } from './types/CollectionLaunchpadParam';
import { chainScanInfoMessage, groupBy } from './schared';
import type { CollectionLaunchpadEntrie } from './types/CollectionLaunchpadEntrie';
import type { UserLaunchpadStats } from './types/UserLaunchpadStats';
import { infoMessage } from '../state/error';

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
  const contractAddresses = await getSystemContextState();
  return contractAddresses.collectionManager;
}

export async function getCollectionsStats(): Promise<
  undefined | CollectionManagerState
> {
  getCollectionManagerState();
  const $collectionManagerState = useStore(collectionManagerState);

  if (!$collectionManagerState.value) return;
  const state = findVar($collectionManagerState.value, 'state');
  if (!state) return;
  return JSON.parse(state);
}

export async function getCollectionsStatsForAddress(
  address: string,
): Promise<undefined | CollectionUserStats> {
  getCollectionManagerState();
  const $collectionManagerState = useStore(collectionManagerState);

  if (!$collectionManagerState.value) return;
  const userStats = findInMap(
    $collectionManagerState.value,
    'user_stats',
    address,
  );
  if (!userStats) return;
  return JSON.parse(userStats);
}

export async function getCollectionData(
  collectionAddress: string,
): Promise<void | CollectionData> {
  getCollectionManagerState();
  const $collectionManagerState = useStore(collectionManagerState);

  if (!$collectionManagerState.value) return;
  const collectionManagerStateValue = $collectionManagerState.value;

  const collection = findInMap(
    collectionManagerStateValue,
    'collections',
    collectionAddress,
  );
  if (!collection) return;

  const collectionState = await getCollectionState(collectionAddress);
  const tokens = findMapValues(collectionState, '\x06tokens').map(
    (tokenData, index) =>
      ({ tokenId: index + 1, ...JSON.parse(tokenData) } as CollectionToken),
  );
  const rewards_percentage_fee = Number(
    findVar(collectionState, 'token_holders_pool_fee'),
  );

  return {
    address: collectionAddress,
    ...JSON.parse(collection),
    tokens,
    rewards_percentage_fee,
  };
}

export async function getCollectionsOwnedByAddress(
  address: string,
): Promise<CollectionData[] | undefined> {
  getCollectionManagerState();
  const $collectionManagerState = useStore(collectionManagerState);

  if (!$collectionManagerState.value) return;
  const collectionManagerStateValue = $collectionManagerState.value;

  // If user created new session try to use cached data to swap them later with newest
  const cachedOwnedUserCollections = localStorage.getItem(
    'ownedUserCollections',
  );
  if (cachedOwnedUserCollections) {
    const parseCachedOwnedTokens: CollectionData[] = JSON.parse(
      cachedOwnedUserCollections,
    );
    ownedUserCollections.set(parseCachedOwnedTokens);
  }

  const userCollections = findInMap(
    collectionManagerStateValue,
    'user_collections',
    address,
  );
  if (!userCollections) return;
  const collectionList: string[] = JSON.parse(userCollections);

  const collectionsData = await Promise.all(
    collectionList.map((collectionAddress) =>
      getCollectionData(collectionAddress),
    ),
  );

  const collections = collectionsData.filter(
    (col) => col !== undefined,
  ) as CollectionData[];
  ownedUserCollections.set(collections);
  localStorage.setItem('ownedUserCollections', JSON.stringify(collections));

  return collections;
}

export async function getOwnedTokensByAddress(address: string) {
  getCollectionManagerState();
  const $collectionManagerState = useStore(collectionManagerState);

  if (!$collectionManagerState.value) return;
  const collectionManagerStateValue = $collectionManagerState.value;

  // If user created new session try to use cached data to swap them later with newest
  const cachedOwnedTokens = localStorage.getItem('ownedUserTokens');
  if (cachedOwnedTokens) {
    const parseCachedOwnedTokens: CollectionData[] =
      JSON.parse(cachedOwnedTokens);
    ownedUserTokens.set(parseCachedOwnedTokens);
  }

  const userCollections = findMapKeys(
    collectionManagerStateValue,
    '\u000bcollections',
  );

  const ownedTokens: CollectionData[] = [];

  await Promise.all(
    userCollections.map(async (collectionAddress) => {
      const contractState = await getCollectionData(collectionAddress);
      if (!contractState || !contractState.tokens) return;

      const userTokens = contractState.tokens.filter(
        (token) => token.owner === address,
      );
      if (userTokens.length === 0) return;

      ownedTokens.push({ ...contractState, userTokens });
      if (!cachedOwnedTokens) {
        ownedUserTokens.set([...ownedTokens]);
      }
    }),
  );
  ownedUserTokens.set([...ownedTokens]);
  localStorage.setItem('ownedUserTokens', JSON.stringify(ownedTokens));

  return ownedTokens;
}

export async function mintNFTs(
  collectionAddress: string,
  filesToUpload: {
    [key: string]: {
      image?: Blob | undefined;
      metadata?: string | undefined;
    };
  },
  collection: CollectionData,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const tokens = await buildMintObject(
    signerAddress,
    filesToUpload,
    collection,
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
  chainScanInfoMessage(transactionHash)
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
  chainScanInfoMessage(transactionHash)
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
  chainScanInfoMessage(transactionHash)
}

/*
 *
 *  ==== LaunchpadManager ====
 *
 */

export async function getLaunchpadStatsForAddress(
  address: string,
): Promise<{} | UserLaunchpadStats> {
  getLaunchpadManagerState();
  const $launchpadManagerState = useStore(launchpadManagerState);

  if (!$launchpadManagerState.value) return {};
  const launchpadManagerValue = $launchpadManagerState.value;
  const userStats = findInMap(launchpadManagerValue, 'user_stats', address);
  if (!userStats) return {};

  return JSON.parse(userStats);
}

export async function getAllocatedTokensNum(
  collectionAddress: string,
): Promise<undefined | number> {
  getLaunchpadManagerState();
  const $launchpadManagerState = useStore(launchpadManagerState);

  if (!$launchpadManagerState.value) return;
  const launchpadManagerValue = $launchpadManagerState.value;
  const userStats = findInMap(
    launchpadManagerValue,
    'tokens_count',
    collectionAddress,
  );

  if (!userStats) return;
  return Number(userStats);
}

export async function getLaunchpadManager(): Promise<string> {
  const contractAddresses = await getSystemContextState();
  return contractAddresses.launchpadManager;
}

export async function getLaunchpadEntries(): Promise<{
  finished?: CollectionLaunchpadEntrie[];
  ongoing?: CollectionLaunchpadEntrie[];
  upcoming?: CollectionLaunchpadEntrie[];
}> {
  getLaunchpadManagerState();
  const $launchpadManagerState = useStore(launchpadManagerState);

  if (!$launchpadManagerState.value) return {};
  const launchpadManagerValue = $launchpadManagerState.value;

  const mintingEvents = normalizeMap(
    launchpadManagerValue,
    '\u0000\u000eminting_events',
  ).map(async (item) => {
    const value: MintEvent = JSON.parse(item.value);
    const collectionParams = findInMap(
      launchpadManagerValue,
      'launchpad_params',
      item.key,
    );
    const parsedCollectionParams: CollectionLaunchpadParam = collectionParams
      ? JSON.parse(collectionParams)
      : {};

    const whitelist = findInMap(launchpadManagerValue, 'whitelists', item.key);
    const parsedWhitelist = whitelist ? JSON.parse(whitelist) : undefined;

    const preview = findInMap(
      launchpadManagerValue,
      'minting_event_previews',
      item.key,
    );
    const parsedPreview = preview ? JSON.parse(preview) : {};

    const start_time = new Date(Number(value.start_time) * 1000).getTime();
    const end_time = new Date(Number(value.end_time) * 1000).getTime();
    const currentTime = new Date().getTime();

    let status;
    if (currentTime < start_time) {
      status = 'upcoming';
    } else if (currentTime > start_time && currentTime < end_time) {
      status = 'ongoing';
    } else {
      status = 'finished';
    }

    return {
      ...value,
      ...parsedCollectionParams,
      start_time,
      end_time,
      status,
      whitelist: parsedWhitelist,
      preview: parsedPreview,
      collection: await getCollectionData(item.key),
    };
  });

  const launchpadEntries = await Promise.all(mintingEvents);
  const groupedLaunchpadEntries = groupBy(launchpadEntries, 'status');

  Object.keys(groupedLaunchpadEntries).forEach(
    (key) =>
      (groupedLaunchpadEntries[key] = groupedLaunchpadEntries[key].sort(
        (a: any, b: any) => (a.start_time > b.start_time ? 0 : -1),
      )),
  );

  return groupedLaunchpadEntries;
}

export async function allocateTokens(
  collectionAddress: string,
  filesToUpload: {
    [key: string]: {
      image?: Blob | undefined;
      metadata?: string | undefined;
    };
  },
  collection: CollectionData,
) {
  const { signerAddress, archwaySigner } = await getArchwaySigner();
  const tokens = await buildMintObject(
    signerAddress,
    filesToUpload,
    collection,
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
  chainScanInfoMessage(transactionHash)
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
  const launchpadManagerContract = await getLaunchpadManager();
  const { transactionHash } = await archwaySigner.execute(
    signerAddress,
    launchpadManagerContract,
    { claim_token },
    'auto',
    undefined,
    [{ denom, amount: tokenAmount }],
  );
  chainScanInfoMessage(transactionHash)
}

/*
 *
 *  ==== Collection ====
 *
 */

export async function getAllRewards(
  collectionAddress: string,
): Promise<{ [key: string]: BigNumber }> {
  const queryClient = await getQueryClient();
  const rewards = await queryClient.getAllRewardsRecords(collectionAddress);

  const accumulatedRewards: { [key: string]: BigNumber } = {};

  const coins = rewards.map((reward) => reward.rewards).flat();
  coins.forEach((coin) => {
    if (accumulatedRewards[coin.denom])
      accumulatedRewards[coin.denom].add(new BigNumber(coin.amount));
    else accumulatedRewards[coin.denom] = new BigNumber(coin.amount);
  });

  return accumulatedRewards;
}

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
  chainScanInfoMessage(transactionHash)
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

export async function listToken(
  collectionAddress: string,
  tokenId: number,
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
        token_id: tokenId.toString(),
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
  chainScanInfoMessage(transactionHash)
}

export async function sendToken(
  collectionAddress: string,
  tokenId: number,
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
  chainScanInfoMessage(transactionHash)
}
/*
 *
 *  ==== MarketplaceManager ====
 *
 */

export async function getMarketplaceManager(): Promise<string> {
  const contractAddresses = await getSystemContextState();
  return contractAddresses.marketplaceManager;
}

export async function getRecentListings(): Promise<Listing[] | undefined> {
  getMarketplaceManagerState();
  const $marketplaceManagerState = useStore(marketplaceManagerState);

  if (!$marketplaceManagerState.value) return;

  const recentOffers: Listing[] = findMapValues(
    $marketplaceManagerState.value,
    '\u0000\u000frecent_listings\u0000',
  )
    .map((item) => JSON.parse(item))
    .reverse();

  return recentOffers;
}

export async function getCollectionListings(
  collectionAddr: string,
): Promise<undefined | Listing[]> {
  getMarketplaceManagerState();
  const $marketplaceManagerState = useStore(marketplaceManagerState);

  if (!$marketplaceManagerState.value) return;

  const listings: Listing[] = findAllInMap(
    $marketplaceManagerState.value,
    '\u0000\blistings',
    collectionAddr,
  ).map((item) => JSON.parse(item));

  return listings;
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
  chainScanInfoMessage(transactionHash)
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
  chainScanInfoMessage(transactionHash)
}

export async function getTokenOffers(
  collectionAddr: string,
  tokenId: string,
): Promise<UserOffers[]> {
  getMarketplaceManagerState();
  const $marketplaceManagerState = useStore(marketplaceManagerState);
  if (!$marketplaceManagerState.value) return [];

  const offers = findAllInMap(
    $marketplaceManagerState.value,
    'listing_offers\u0000',
    `${collectionAddr}-${tokenId}`,
  );

  return offers.map((el) => JSON.parse(el));
}

export async function getAddressTokenOffers(
  address: string,
): Promise<[] | UserOffers[]> {
  getMarketplaceManagerState();
  const $marketplaceManagerState = useStore(marketplaceManagerState);
  if (!$marketplaceManagerState.value) return [];

  const userOffers = findInMap(
    $marketplaceManagerState.value,
    'user_offers',
    address,
  );

  if (!userOffers) return [];
  const parsedUserOffers = await Promise.all(
    (JSON.parse(userOffers) as string[]).map(async (id) => {
      const [collection, token_id] = id.split('-');
      const offers = await getTokenOffers(collection, token_id);
      if (!offers)
        return {
          collection,
          token_id,
        };
      const offer = offers.find((el) => el.from === address);
      if (!offer)
        return {
          collection,
          token_id,
        };

      return {
        ...offer,
        collection,
        token_id,
      };
    }),
  );

  return parsedUserOffers;
}

export async function getAddressTokenListings(
  address: string,
): Promise<UserListings[]> {
  getMarketplaceManagerState();
  const $marketplaceManagerState = useStore(marketplaceManagerState);
  if (!$marketplaceManagerState.value) return [];
  const marketplaceManagerValue = $marketplaceManagerState.value;

  const tokenListings = findInMap(
    marketplaceManagerValue,
    'user_offers',
    address,
  );

  if (!tokenListings) return [];
  const parsedUserOffers = await Promise.all(
    (JSON.parse(tokenListings) as string[]).map(async (id) => {
      const offer = findInMap(marketplaceManagerValue, '\u0000\blistings', id);

      if (!offer) return {};
      return JSON.parse(offer);
    }),
  );

  return parsedUserOffers;
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
  chainScanInfoMessage(transactionHash)
}

export async function acceptOffer(
  collectionAddr: string,
  tokenId: string,
  fromAddress: string,
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
        from: fromAddress,
      },
    },
    'auto',
  );
  chainScanInfoMessage(transactionHash)
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
  chainScanInfoMessage(transactionHash)
}
