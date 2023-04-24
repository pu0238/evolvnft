import { CARNISTER_API_URL } from "./constant";

export async function createEvolveCollection(
  accountAddress: string
): Promise<number> {
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`,
    {
      method: "POST",
    }
  );
  return (await result.json()).collectionId;
}

export async function postEvolveMetadata(
  accountAddress: string,
  collectionId: number,
  arweaveHash: string
): Promise<number> {
  const raw = JSON.stringify({
    arweave_hash: arweaveHash,
  });
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`,
    {
      method: "POST",
      body: raw,
    }
  );
  return (await result.json()).metadataId;
}

export async function editEvolveMetadata(
  accountAddress: string,
  collectionId: number,
  metadataId: number,
  arweaveHash: string
): Promise<number> {
  const raw = JSON.stringify({
    arweave_hash: arweaveHash,
  });
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}/${metadataId}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`,
    {
      method: "POST",
      body: raw,
    }
  );
  return (await result.json()).metadataId;
}
export async function getNextMetadataId(
  accountAddress: string,
  collectionId: number
): Promise<number> {
  const result = await fetch(
    `${CARNISTER_API_URL}/collection/${accountAddress}/${collectionId}/next?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`,
    {
      method: "GET",
    }
  );
  return (await result.json()).nextMetadataId;
}
