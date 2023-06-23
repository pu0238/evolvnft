import { atom } from 'nanostores';

export const isErrorPopout = atom(false);
export const errorMessage = atom(
  'Connect your wallet to the page to continue!',
);
