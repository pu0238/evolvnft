import { errorMessage } from '../state/error';
import { collectionManagerContractAddress, launchpadManagerContractAddress } from '../state/stateCache';
import {
  CARNISTER_API_URL,
  SYSTEM_CONTEXT_CONTRACT_ADDRESS,
} from './constant';
import { getQueryClient } from './wallet';

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
  return (await result.json()).metadataId;
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

export async function getCollectionsStats() {
  const queryClient = await getQueryClient();
  const collectionManagerContract = await getCollectionManager();

  return await queryClient.queryContractSmart(
    collectionManagerContract,
    { get_stats: {} },
  );
}

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