import { postEvolveMetadata } from "./evolve";
import type { CollectionEntitie } from "./types/CollectionItem";
import { uploadArray, uploadFile } from "./uploader";

export function joinMetadataAndImages(
  files: any[],
  imgTypes: string[],
  jsonTypes: string[]
) {
  const filesToUpload: { [key: string]: { image?: any; metadata?: any } } = {};
  files.forEach((file: any) => {
    const fileName = file.name.split(".")[0];
    if (imgTypes.includes(file.type)) {
      if (!filesToUpload[fileName]) filesToUpload[fileName] = {};
      filesToUpload[fileName]["image"] = file;
    } else if (jsonTypes.includes(file.type)) {
      if (!filesToUpload[fileName]) filesToUpload[fileName] = {};
      filesToUpload[fileName]["metadata"] = file;
    }
  });
  return filesToUpload;
}

export async function uploadTokenMetadata(filesToUpload: {
  [key: string]: { image?: any; metadata?: any };
}) {
  const imageIds: Promise<string | void>[] = [];
  for (const fileName in filesToUpload) {
    if (!filesToUpload[fileName].image || !filesToUpload[fileName].metadata) {
      continue;
    }
    imageIds.push(uploadFile(filesToUpload[fileName].image));
  }

  const resolvedImageIds = await Promise.all(imageIds);
  for (const imageId of resolvedImageIds) {
    if (!imageId) return console.error("Failed to upload images");
  }

  let imageIndex = 0;
  const metadataIds: Promise<string | void>[] = [];
  for (const fileName in filesToUpload) {
    if (!filesToUpload[fileName].image || !filesToUpload[fileName].metadata) {
      continue;
    }
    const metadata = await filesToUpload[fileName].metadata.text();
    const parsedMetadata = JSON.parse(metadata);
    const imageUploadId = resolvedImageIds[imageIndex];
    imageIndex++;
    parsedMetadata.image = `https://arweave.net/${imageUploadId}`;
    const encodedMetadata = new Blob([JSON.stringify(parsedMetadata)]);
    metadataIds.push(uploadArray(encodedMetadata, "application/json"));
  }

  const resolvedMetadataIds = await Promise.all(metadataIds);
  for (const metadataId of resolvedMetadataIds) {
    if (!metadataId) return console.error("Failed to upload metadata");
  }
  return resolvedMetadataIds;
}

export async function buildMintObject(
  accountAddress: string,
  filesToUpload: {
    [key: string]: { image?: any; metadata?: any };
  },
  collection: CollectionEntitie
) {
  const tokensMetadata = await uploadTokenMetadata(filesToUpload);
  if (!tokensMetadata) return console.error("Failed to upload images");

  const mintObject: { a: string; b: number; c: number }[] = [];
  for (const metadata of tokensMetadata) {
    if (!metadata) return console.error("Failed to upload metdata");
    if (!collection.ic_collection_id) {
      mintObject.push({ a: metadata, b: 0, c: 0 });
    } else {
      const metadataId = await postEvolveMetadata(
        accountAddress,
        collection.ic_collection_id,
        metadata
      );
      mintObject.push({
        a: accountAddress,
        b: collection.ic_collection_id,
        c: metadataId,
      });
    }
  }
  return mintObject;
}
