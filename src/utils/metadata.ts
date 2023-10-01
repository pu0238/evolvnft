import { postEvolveMetadatav2 } from './evolve';
import type { CollectionEntitie } from './types/CollectionEntitie';
import { uploadBlob } from './bundlrUploader';
import { errorMessage } from '../state/error';
import type { CollectionData } from './types/CollectionData';

export async function joinMetadataAndImages(
  files: Blob[],
  imgTypes: string[],
  jsonTypes: string[],
): Promise<{
  [key: string]: { image?: Blob | undefined; metadata?: string | undefined };
}> {
  const filesToUpload: { [key: string]: { image?: Blob; metadata?: string } } =
    {};
  for (const file of files) {
    const fileName = file.name.split('.')[0];
    if (imgTypes.includes(file.type)) {
      if (!filesToUpload[fileName]) filesToUpload[fileName] = {};
      filesToUpload[fileName]['image'] = file;
    } else if (jsonTypes.includes(file.type)) {
      if (!filesToUpload[fileName]) filesToUpload[fileName] = {};
      filesToUpload[fileName]['metadata'] = await file.text();
    }
  }
  return filesToUpload;
}

function filterUploadMetadata(filesToUpload: {
  [key: string]: { image?: Blob; metadata?: string };
}): {
  [key: string]: { image: Blob; metadata: string };
} {
  const result: {
    [key: string]: { image: Blob; metadata: string };
  } = {};
  for (const fileName in filesToUpload) {
    const image = filesToUpload[fileName].image;
    const metadata = filesToUpload[fileName].metadata;
    if (image && metadata) {
      result[fileName] = { image, metadata };
    }
  }
  return result;
}

export async function uploadTokenMetadata(filesToUpload: {
  [key: string]: { image?: Blob; metadata?: string };
}) {
  const files = filterUploadMetadata(filesToUpload);
  const imageIds: Promise<{
    fileUrl: string;
    type: string;
  }>[] = [];
  for (const fileName in files) {
    const image = files[fileName].image;
    imageIds.push(uploadBlob(image, image.type));
  }

  const resolvedImageIds = await Promise.all(imageIds);
  let imageIndex = 0;
  const promiseIds: Promise<string>[] = [];
  for (const fileName in files) {
    const metadata = files[fileName].metadata;
    const imageUploadId = resolvedImageIds[imageIndex];

    imageIndex++;
    const enrichedMetadata = enrichMetadataWithImage(
      metadata,
      imageUploadId.fileUrl,
      imageUploadId.type,
    );
    promiseIds.push(uploadStringMetadata(enrichedMetadata));
  }
  const uploadedMetadataIds: string[] = await Promise.all(promiseIds);
  return uploadedMetadataIds;
}

export async function buildMintObject(
  accountAddress: string,
  filesToUpload: {
    [key: string]: { image?: Blob; metadata?: string };
  },
  collection: CollectionData,
) {
  const tokensMetadata = await uploadTokenMetadata(filesToUpload);
  if (!tokensMetadata) return console.error('Failed to upload images');

  let mintObject: { a: string; b: number; c: number }[] = [];
  if (!collection.ic_collection_id) {
    mintObject = tokensMetadata.map((metadata) => ({
      a: `https://arweave.net/${metadata}`,
      b: 0,
      c: 0,
    }));
  } else {
    const metadataList: { arweave_hash: string }[] = tokensMetadata.map(
      (metadata) => ({ arweave_hash: metadata }),
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

export async function readFileAsDataURL(file: any): Promise<string> {
  const base64data = await new Promise<string | undefined>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result?.toString();
      if (base64data) {
        return resolve(base64data);
      } else {
        return undefined;
      }
    };
  });
  if (base64data) {
    return base64data;
  } else {
    throw errorMessage.set('Failed to read image file');
  }
}

export async function uploadImage(image: Blob): Promise<string> {
  const imageUploadId = await uploadBlob(image, image.type);
  return `https://arweave.net/${imageUploadId}`;
}

export async function uploadStringMetadata(metadata: string): Promise<string> {
  const encodedMetadata = new Blob([metadata]);
  return (await uploadBlob(encodedMetadata, 'application/json')).fileUrl;
}

export function enrichMetadataWithImage(
  metadata: string,
  imageId: string,
  type: string,
) {
  const imageUrl = `https://arweave.net/${imageId}`;
  const parsedMetadata = JSON.parse(metadata);
  if (parsedMetadata?.properties?.files) {
    parsedMetadata?.properties?.files.push({
      uri: imageUrl,
      type,
    });
  } else {
    parsedMetadata.properties = {
      files: [
        {
          uri: imageUrl,
          type,
        },
      ],
    };
  }
  parsedMetadata.image = imageUrl;
  return JSON.stringify(parsedMetadata);
}

export async function uploadMetadataAndImage(
  image: Blob,
  metadata: string,
): Promise<string> {
  const url = await uploadImage(image);
  const metadataToUpload = enrichMetadataWithImage(metadata, url, image.type);
  return await uploadStringMetadata(metadataToUpload);
}
