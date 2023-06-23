import { postEvolveMetadata, postEvolveMetadatav2 } from './evolve';
import type { CollectionEntitie } from './types/CollectionItem';
import { sleep } from './schared';
import { uploadBlob } from './bundlrUploader';

export function joinMetadataAndImages(
  files: any[],
  imgTypes: string[],
  jsonTypes: string[],
) {
  const filesToUpload: { [key: string]: { image?: any; metadata?: any } } = {};
  files.forEach((file: any) => {
    const fileName = file.name.split('.')[0];
    if (imgTypes.includes(file.type)) {
      if (!filesToUpload[fileName]) filesToUpload[fileName] = {};
      filesToUpload[fileName]['image'] = file;
    } else if (jsonTypes.includes(file.type)) {
      if (!filesToUpload[fileName]) filesToUpload[fileName] = {};
      filesToUpload[fileName]['metadata'] = file;
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
    imageIds.push(
      uploadBlob(
        filesToUpload[fileName].image,
        filesToUpload[fileName].image.type,
      ),
    );
  }

  const resolvedImageIds = await Promise.all(imageIds);
  for (const imageId of resolvedImageIds) {
    if (!imageId) return console.error('Failed to upload images');
  }

  let imageIndex = 0;
  //let uploadedMetadataIds: (string | void)[] = [];
  const promiseIds: Promise<string | void>[] = [];
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
    promiseIds.push(uploadBlob(encodedMetadata, 'application/json'));
  }
  const uploadedMetadataIds: (string | void)[] = await Promise.all(promiseIds);
  for (const metadataId of uploadedMetadataIds) {
    if (!metadataId) return console.error('Failed to upload metadata');
  }
  return uploadedMetadataIds;
}

export async function buildMintObject(
  accountAddress: string,
  filesToUpload: {
    [key: string]: { image?: any; metadata?: any };
  },
  collection: CollectionEntitie,
) {
  const tokensMetadata = await uploadTokenMetadata(filesToUpload);
  if (!tokensMetadata) return console.error('Failed to upload images');

  let mintObject: { a: string; b: number; c: number }[] = [];
  if (!collection.ic_collection_id) {
    mintObject = tokensMetadata.map((metadata) => ({
      a: metadata as string,
      b: 0,
      c: 0,
    }));
  } else {
    const metadataList: { arweave_hash: string }[] = tokensMetadata.map(
      (metadata) => ({ arweave_hash: metadata as string }),
    );
    const collectionId = collection.ic_collection_id;
    const result = await postEvolveMetadatav2(
      accountAddress,
      collectionId,
      metadataList,
    );
    mintObject = result.map((metadataId) => ({
      a: accountAddress,
      b: collectionId,
      c: metadataId,
    }));
  }

  return mintObject;
}
