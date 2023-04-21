import type { Window as KeplrWindow, OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";
import { useStore } from "@nanostores/vue";
import { isWalletConnected } from "../state/walletState";
import { CONSTANTINE_INFO } from "./constant";

declare global {
  interface Window extends KeplrWindow {}
}

export async function sharedConnect() {
  const isWalletConnectedValue = useStore(isWalletConnected).value;
  const { keplr } = window;
  if (!keplr) {
    alert("You need to install Keplr");
    return;
  }
  if (isWalletConnectedValue) {
    await keplr.disable(CONSTANTINE_INFO.chainId);
    isWalletConnected.set(false);
    return;
  }
  await keplr.experimentalSuggestChain(CONSTANTINE_INFO);
  await keplr.enable(CONSTANTINE_INFO.chainId);
  isWalletConnected.set(true);
}
