import type { CollectionData } from './CollectionData';

export interface CollectionTokensMetadata {
  [key: string]: {
    tokens: { [key: string]: { metadataUrl?: string; metadata?: any } };
    collectionData: void | CollectionData;
  };
}
