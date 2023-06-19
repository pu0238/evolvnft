import { OfflineAminoSigner, OfflineDirectSigner } from '@keplr-wallet/types';
import {
  CARNISTER_API_URL,
  COLLECTION_MANAGER_CONTRACT_ADDRESS,
} from './constant';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
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

export async function getLaunchpad(): Promise<string> {
  const queryClient = await getQueryClient();
  const state = await queryClient.queryContractRaw(
    COLLECTION_MANAGER_CONTRACT_ADDRESS,
    Uint8Array.from(Buffer.from('state')),
  );
  const text = Buffer.from(state).toString('utf-8');

  return JSON.parse(text).launchpad_addr;
}

export async function getCollectionsStats() {
  const queryClient = await getQueryClient();

  return await queryClient.queryContractSmart(
    COLLECTION_MANAGER_CONTRACT_ADDRESS,
    { get_stats: {} },
  );
}

export async function getLaunchpadStats() {
  const queryClient = await getQueryClient();
  const launchpad = await getLaunchpad();

  return await queryClient.queryContractSmart(launchpad, { get_stats: {} });
}
