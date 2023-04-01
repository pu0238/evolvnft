import type { Window as KeplrWindow } from "@keplr-wallet/types";
import { useStore } from "@nanostores/vue";
import { isWalletConnected } from "../state/walletState";
import { ConstantineInfo } from "./constant";

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
    await keplr.disable(ConstantineInfo.chainId);
    isWalletConnected.set(false);
    return;
  }
  await keplr.experimentalSuggestChain(ConstantineInfo);
  await keplr.enable(ConstantineInfo.chainId);
  isWalletConnected.set(true);
}
