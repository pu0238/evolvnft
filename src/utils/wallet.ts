import type {
  Window as KeplrWindow,
} from '@keplr-wallet/types';
import { isWalletConnected } from '../state/walletState';
import { CONSTANTINE_INFO } from './constant';
import { errorMessage, isErrorPopout } from '../state/error';
import { ArchwayClient, SigningArchwayClient } from '@archwayhq/arch3.js';

declare global {
  interface Window extends KeplrWindow {}
}

export async function sharedConnect() {
  const isWalletConnectedValue = localStorage.getItem('isWalletConnected');
  const { keplr } = window;
  if (!keplr) {
    alert('You need to install Keplr');
    return;
  }
  if (isWalletConnectedValue === 'true') {
    await keplr.disable(CONSTANTINE_INFO.chainId);
    localStorage.setItem('isWalletConnected', 'false');
    isWalletConnected.set(false);
    return;
  }
  await keplr.experimentalSuggestChain(CONSTANTINE_INFO);
  await keplr.enable(CONSTANTINE_INFO.chainId);
  localStorage.setItem('isWalletConnected', 'true');
  isWalletConnected.set(true);
}

export function isWallet(): boolean {
  const localIsWalletConnected =
    localStorage.getItem('isWalletConnected') === 'true';
  isWalletConnected.set(localIsWalletConnected);
  return localIsWalletConnected;
}

export function isWalletPopup(): boolean {
  if (isWallet()) {
    errorMessage.set('Connect your wallet to the page to continue!');
    isErrorPopout.set(true);
    return false;
  }
  return true;
}

export function openIfConnected(url: string) {
  if (isWallet()) {
    window.open(url, '_self');
  }
}

export async function getArchwaySigner(): Promise<{
  signerAddress: string;
  archwaySigner: SigningArchwayClient;
}> {
  const offlineSigner = window.keplr?.getOfflineSigner(
    CONSTANTINE_INFO.chainId,
  );
  if (!offlineSigner) {
    throw console.error('Failed to create offline signer');
  }
  const accounts = await offlineSigner.getAccounts();
  const signerAddress = accounts[0].address;
  const archwaySigner = await SigningArchwayClient.connectWithSigner(
    CONSTANTINE_INFO.rpc,
    offlineSigner,
  );

  return { signerAddress: signerAddress, archwaySigner: archwaySigner };
}

export async function getQueryClient(): Promise<ArchwayClient> {
  return await ArchwayClient.connect(CONSTANTINE_INFO.rpc);
}
