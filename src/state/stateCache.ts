import { WritableAtom, atom } from 'nanostores';

export const collectionManagerContractAddress: WritableAtom<
  undefined | string
> = atom(undefined);
export const launchpadManagerContractAddress: WritableAtom<undefined | string> =
  atom(undefined);
