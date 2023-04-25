import { atom } from "nanostores";

export const isColectionClosed = atom(true);
export const tokenLimit = atom("");
export const collectionImg = atom("/evolvnft-collection-logo.svg");
export const collectionTitle = atom("Evolv NFT");
export const collectionSymbol = atom("EN");
export const collectionEvolvMetadata = atom(false);
export const collectionDescription = atom(
  "this is example description of your digital asset. it should be short and clear."
);
