import type { CollectionEntitie } from './CollectionItem';

export interface CollectionTokensMetadata {
  [key: string]: {
    tokens: { [key: string]: { metadataUrl?: string; metadata?: any } };
    collectionData: CollectionEntitie;
  };
}
