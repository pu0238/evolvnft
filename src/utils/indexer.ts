import { NETWORK_INFO } from './constant';
import type { AddressTokens } from './types/AddressTokens';
import type { TxQuery } from './types/TxQuery';
import type { TxResponse } from './types/TxResponse';

const txQueryEndpoint = `${NETWORK_INFO.rest}/cosmos/tx/v1beta1`;

const getReceivedMintTxs = async (address: string): Promise<TxQuery> => {
  const url = `${txQueryEndpoint}/txs?events=wasm.action%3D%27mint%27&events=wasm.owner%3D%27${address}%27&order_by=ORDER_BY_UNSPECIFIED`;

  const req = await fetch(url);
  return await req.json();
};

const getReceivedTransferTxs = async (address: string): Promise<TxQuery> => {
  const url = `${txQueryEndpoint}/txs?events=wasm.action%3D%27transfer_nft%27&events=wasm.recipient%3D%27${address}%27&order_by=ORDER_BY_UNSPECIFIED`;

  const req = await fetch(url);
  return await req.json();
};

const getSpendTransferTxs = async (address: string): Promise<TxQuery> => {
  const url = `${txQueryEndpoint}/txs?events=wasm.action%3D%27transfer_nft%27&events=wasm.sender%3D%27${address}%27&order_by=ORDER_BY_UNSPECIFIED`;

  const req = await fetch(url);
  return await req.json();
};

const getSpendSendTxs = async (address: string): Promise<TxQuery> => {
  const url = `${txQueryEndpoint}/txs?events=wasm.action%3D%27send_nft%27&events=wasm.sender%3D%27${address}%27&order_by=ORDER_BY_UNSPECIFIED`;

  const req = await fetch(url);
  return await req.json();
};

const getSpendBurnTxs = async (address: string): Promise<TxQuery> => {
  const url = `${txQueryEndpoint}/txs?events=wasm.action%3D%27burn%27&events=wasm.sender%3D%27${address}%27&order_by=ORDER_BY_UNSPECIFIED`;

  const req = await fetch(url);
  return await req.json();
};

const getLatestBlockHeight = async (): Promise<string> => {
  const req = await fetch(
    `${NETWORK_INFO.rest}/cosmos/base/tendermint/v1beta1/blocks/latest`,
  );
  const data = await req.json();

  return data.block.header.height;
};

const base64Decode = (text: string) => Buffer.from(text, 'base64').toString();

const getCollectionDataFromEvents = (
  txRes: TxResponse,
): { collectionAddress: string; tokenId: string } | undefined => {
  const _contract_address = Buffer.from('_contract_address').toString('base64');
  const token_id = Buffer.from('token_id').toString('base64');

  const wasmEvent = txRes.events.find(
    (eveentData) => eveentData.type === 'wasm',
  );

  if (!wasmEvent) throw 'WASM event not found';

  const collectionAddress = wasmEvent.attributes.find(
    (element) => element.key === _contract_address,
  );
  const tokenId = wasmEvent.attributes.find(
    (element) => element.key === token_id,
  );

  if (!collectionAddress || !tokenId) throw 'Collection data not found';

  return {
    collectionAddress: base64Decode(collectionAddress.value),
    tokenId: base64Decode(tokenId.value),
  };
};

const bumpTokenAtCollection = (
  receivedTokens: AddressTokens,
  collectionAddress: string,
  tokenId: string,
) => {
  if (
    receivedTokens.collections[collectionAddress] &&
    receivedTokens.collections[collectionAddress][tokenId]
  ) {
    receivedTokens.collections[collectionAddress][tokenId]++;
  } else {
    receivedTokens.collections[collectionAddress] = { ...receivedTokens.collections[collectionAddress], [tokenId]: 1 };
  }
};

const decreaseTokenAtCollection = (
  receivedTokens: AddressTokens,
  collectionAddress: string,
  tokenId: string,
) => {
  if (
    receivedTokens.collections[collectionAddress] &&
    receivedTokens.collections[collectionAddress][tokenId]
  ) {
    receivedTokens.collections[collectionAddress][tokenId]--;
    if (receivedTokens.collections[collectionAddress][tokenId] === 0) {
      delete receivedTokens.collections[collectionAddress][tokenId];
    }
    if (
      Object.keys(receivedTokens.collections[collectionAddress]).length === 0
    ) {
      delete receivedTokens.collections[collectionAddress];
    }
  }
};

const processTx = async (
  txData: TxQuery,
  receivedTokens: AddressTokens,
  mode: 'bump' | 'decrease',
) => {
  await Promise.all(
    txData.tx_responses.map(async (txRes) => {
      const tokenData = getCollectionDataFromEvents(txRes);
      if (tokenData) {
        if (mode === 'bump') {
          bumpTokenAtCollection(
            receivedTokens,
            tokenData.collectionAddress,
            tokenData.tokenId,
          );
        } else {
          decreaseTokenAtCollection(
            receivedTokens,
            tokenData.collectionAddress,
            tokenData.tokenId,
          );
        }
      }
    }),
  );
};

export const getAddressNFTs = async (address: string) => {
  const receivedTokens: AddressTokens = {
    collections: {},
  };

  const [
    syncedTo,
    receivedMints,
    receivedTransfers,
    spendTransfers,
    spendSends,
    spendBurn,
  ] = await Promise.all([
    getLatestBlockHeight(),
    getReceivedMintTxs(address),
    getReceivedTransferTxs(address),
    getSpendTransferTxs(address),
    getSpendSendTxs(address),
    getSpendBurnTxs(address),
  ]);

  receivedTokens.syncedTo = syncedTo;
  /*
  //
  // Received tokens
  //

  processTx(receivedMints, receivedTokens, 'bump');
  processTx(receivedTransfers, receivedTokens, 'bump');

  //
  // Spend tokens
  //

  processTx(spendTransfers, receivedTokens, 'decrease');
  processTx(spendSends, receivedTokens, 'decrease');
  processTx(spendBurn, receivedTokens, 'decrease');
*/
  await Promise.all([
    processTx(receivedMints, receivedTokens, 'bump'),
    processTx(receivedTransfers, receivedTokens, 'bump'),
    processTx(spendTransfers, receivedTokens, 'decrease'),
    processTx(spendSends, receivedTokens, 'decrease'),
    processTx(spendBurn, receivedTokens, 'decrease'),
  ]);

  return receivedTokens
};
