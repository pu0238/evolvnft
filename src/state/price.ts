import { atom, type WritableAtom } from 'nanostores';

export const archPrice: WritableAtom<undefined | number> = atom(undefined);
