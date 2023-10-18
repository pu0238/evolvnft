import { WritableAtom, atom } from 'nanostores';
import type { CollectionData } from '../utils/types/CollectionData';

export const ownedUserTokens: WritableAtom<CollectionData[]> = atom([]);
export const ownedUserCollections: WritableAtom<CollectionData[]> = atom([]);
