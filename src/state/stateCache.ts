import { WritableAtom, atom } from 'nanostores';

export const evolveContracts: WritableAtom<
  | undefined
  | {
      collectionManager: string;
      launchpadManager: string;
      marketplaceManager: string;
    }
> = atom(undefined);

export const collectionManagerState: WritableAtom<
  | undefined
  | DecodedState[]
> = atom(undefined);

export const marketplaceManagerState: WritableAtom<
  | undefined
  | DecodedState[]
> = atom(undefined);

export const launchpadManagerState: WritableAtom<
  | undefined
  | DecodedState[]
> = atom(undefined);

export const synchronizationInProgress: WritableAtom<
| boolean
> = atom(false);