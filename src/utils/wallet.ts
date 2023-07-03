import type { Window as KeplrWindow } from '@keplr-wallet/types';
import { isWalletConnected, walletSignerAddress } from '../state/walletState';
import { CONSTANTINE_INFO } from './constant';
import { ArchwayClient, SigningArchwayClient } from '@archwayhq/arch3.js';
import { errorMessage } from '../state/error';

declare global {
  interface Window extends KeplrWindow {}
}

export async function sharedConnect() {
  const isWalletConnectedValue = localStorage.getItem('isWalletConnected');
  const { keplr } = window;
  if (!keplr) {
    throw errorMessage.set('You need to install Keplr');
  }
  if (isWalletConnectedValue === 'true') {
    await keplr.disable(CONSTANTINE_INFO.chainId);
    localStorage.setItem('isWalletConnected', 'false');
    localStorage.removeItem('signerAddress');
    isWalletConnected.set(false);
    walletSignerAddress.set(undefined);
    return;
  }
  await keplr.experimentalSuggestChain(CONSTANTINE_INFO);
  await keplr.enable(CONSTANTINE_INFO.chainId);
  const { signerAddress } = await getArchwaySigner();
  localStorage.setItem('isWalletConnected', 'true');
  localStorage.setItem('signerAddress', signerAddress);
  isWalletConnected.set(true);
  walletSignerAddress.set(signerAddress);
}

export function isWallet(): boolean {
  const localIsWalletConnected =
    localStorage.getItem('isWalletConnected') === 'true';
  isWalletConnected.set(localIsWalletConnected);
  const cashedSignerAddress = localStorage.getItem('signerAddress');
  if (localIsWalletConnected && cashedSignerAddress) {
    walletSignerAddress.set(cashedSignerAddress);
  }
  return localIsWalletConnected;
}

export function isWalletPopup(): boolean {
  if (isWallet()) {
    errorMessage.set('Connect your wallet to the page to continue!');
    return false;
  }
  return true;
}

export function openIfConnected(url: string) {
  if (isWallet()) {
    return window.open(url, '_self');
  }
  errorMessage.set('wallet not connected');
}

export async function getArchwaySigner(): Promise<{
  signerAddress: string;
  archwaySigner: SigningArchwayClient;
}> {
  const offlineSigner = window.keplr?.getOfflineSigner(
    CONSTANTINE_INFO.chainId,
  );
  if (!offlineSigner) {
    throw errorMessage.set('Failed to create offline signer');
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
