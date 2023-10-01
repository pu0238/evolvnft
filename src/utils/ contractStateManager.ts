import type { Model } from 'cosmjs-types/cosmwasm/wasm/v1/types';
import type { WasmExtension } from 'cosmwasm';
import { getQueryClient } from './wallet';

export const getAllContractState = async (
  contractAddress: string,
  paginationKey?: Uint8Array,
) => {
  const queryClient = await getQueryClient();
  const wasmClient = //@ts-ignore
    (queryClient.archwayQueryClient.queryClient as WasmExtension).wasm;

  return wasmClient.getAllContractState(contractAddress, paginationKey);
};

export const getAllContractStateWithoutPagination = async (
  contractAddress: string,
) => {
  let nextKey: Uint8Array | undefined = undefined;
  const contractModels: Model[] = [];

  do {
    const contractData = await getAllContractState(contractAddress, nextKey);
    contractModels.push(...contractData.models);
    nextKey = contractData.pagination?.nextKey;
  } while (nextKey && nextKey.length > 0);

  return contractModels;
};

export const decodeState = (state: Model[]): DecodedState[] => {
  return state.map(({ key, value }) => ({
    key: new TextDecoder().decode(key),
    value: new TextDecoder().decode(value),
  }));
};

export const findInMap = (
  decodedState: readonly DecodedState[] | DecodedState[],
  mapId: string,
  mapKey: string,
) =>
  decodedState.find(
    (item) => item.key.includes(mapId) && item.key.includes(mapKey),
  )?.value;

export const findAllInMap = (
  decodedState: readonly DecodedState[] | DecodedState[],
  mapId: string,
  mapKey: string,
) =>
  decodedState
    .filter((item) => item.key.includes(mapId) && item.key.includes(mapKey))
    ?.map((item) => item.value);

export const findMapValues = (
  decodedState: readonly DecodedState[] | DecodedState[],
  mapId: string,
) =>
  decodedState
    .filter((item) => item.key.includes(mapId))
    .map((item) => item.value);

export const findVar = (
  decodedState: readonly DecodedState[] | DecodedState[],
  varId: string,
) => decodedState.find((item) => item.key === varId)?.value;

export const removeExtraQuotes = (str: string) =>
  str.substring(1, str.length - 1);

export const findMapKeys = (
  decodedState: readonly DecodedState[] | DecodedState[],
  mapId: string,
) =>
  decodedState
    .filter((item) => item.key.includes(mapId))
    .map((item) => item.key.slice(item.key.indexOf(mapId) + mapId.length));

export const normalizeMap = (
  decodedState: readonly DecodedState[] | DecodedState[],
  mapId: string,
) =>
  decodedState
    .filter((item) => item.key.includes(mapId))
    .map((item) => ({
      key: item.key.slice(item.key.indexOf(mapId) + mapId.length),
      value: item.value,
    }));
