import { WritableAtom, atom } from 'nanostores';

export const walletSignerAddress: WritableAtom<undefined | string> = atom(undefined)
export const isWalletConnected = atom(false);
