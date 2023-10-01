import { errorMessage, infoMessage } from '../state/error';
import { collectionManagerState, evolveContracts, launchpadManagerState, marketplaceManagerState, synchronizationInProgress } from '../state/stateCache';
import {
  decodeState,
  findInMap,
  getAllContractState,
  getAllContractStateWithoutPagination,
  removeExtraQuotes,
} from './ contractStateManager';
import { SYSTEM_CONTEXT_CONTRACT_ADDRESS } from './constant';
import { getCollectionManager, getLaunchpadManager, getMarketplaceManager } from './evolve';

export async function getSystemContextState() {
  // If session already have loaded state return it
  const sessionEvolveContracts = evolveContracts.get();
  if (sessionEvolveContracts) {
    return sessionEvolveContracts;
  }

  const contractData = await getAllContractState(
    SYSTEM_CONTEXT_CONTRACT_ADDRESS,
  );
  const decodedState = decodeState(contractData.models);

  const collectionManager = findInMap(
    decodedState,
    'other_contracts',
    'COLLECTION_MANAGER',
  );
  const launchpadManager = findInMap(
    decodedState,
    'other_contracts',
    'LAUNCHPAD_MANAGER',
  );
  const marketplaceManager = findInMap(
    decodedState,
    'other_contracts',
    'MARKETPLACE_MANAGER',
  );

  if (!collectionManager || !launchpadManager || !marketplaceManager)
    throw errorMessage.set('Failed to load contracts data');

  const contractAddresses = {
    collectionManager: removeExtraQuotes(collectionManager),
    launchpadManager: removeExtraQuotes(launchpadManager),
    marketplaceManager: removeExtraQuotes(marketplaceManager),
  };

  evolveContracts.set(contractAddresses);
  return contractAddresses;
}

export async function getCollectionManagerState(): Promise<DecodedState[]>  {
  // If session already have loaded state return it
  const sessionCollectionManagerState = collectionManagerState.get();
  if (sessionCollectionManagerState) {
    return sessionCollectionManagerState;
  }

  const loadedCollectionManagerState = loadNewestCollectionManagerState()

  // If user created new session try to use cached data to swap them later with newest
  const cachedCollectionManagerState = localStorage.getItem('collectionManagerState')
  if (cachedCollectionManagerState) {
    const parseCachedCollectionManagerState = JSON.parse(cachedCollectionManagerState)
    collectionManagerState.set(parseCachedCollectionManagerState)
  }

  return await loadedCollectionManagerState
}

async function loadNewestCollectionManagerState(): Promise<DecodedState[]> {
  infoMessage.set('Syncing your collection manager data');
  synchronizationInProgress.set(true)
  
  const collectionManager = await getCollectionManager()
  const contractData = await getAllContractStateWithoutPagination(
    collectionManager
  );
  const decodedContractData = decodeState(contractData)

  // Cache latest contract data
  collectionManagerState.set(decodedContractData)
  localStorage.setItem('collectionManagerState', JSON.stringify(decodedContractData))
  synchronizationInProgress.set(false)

  infoMessage.set('Collection manager data are up to date');
  return decodedContractData
}

export async function getMarketplaceManagerState(): Promise<DecodedState[]>  {
  // If session already have loaded state return it
  const sessionMarketplaceManager = marketplaceManagerState.get();
  if (sessionMarketplaceManager) {
    return sessionMarketplaceManager;
  }

  const loadedMarketplaceManagerState = loadNewestMarketplaceManagerState()

  // If user created new session try to use cached data to swap them later with newest
  const cachedMarketplaceManager = localStorage.getItem('marketplaceManagerState')
  if (cachedMarketplaceManager) {
    const parseMarketplaceManagerState = JSON.parse(cachedMarketplaceManager)
    marketplaceManagerState.set(parseMarketplaceManagerState)
  }

  return await loadedMarketplaceManagerState
}

async function loadNewestMarketplaceManagerState(): Promise<DecodedState[]> {
  infoMessage.set('Syncing your marketplace data');
  synchronizationInProgress.set(true)

  const marketplaceManager = await getMarketplaceManager();
  const contractData = await getAllContractStateWithoutPagination(
    marketplaceManager
  );
  const decodedContractData = decodeState(contractData)

  // Cache latest contract data
  marketplaceManagerState.set(decodedContractData)
  localStorage.setItem('marketplaceManagerState', JSON.stringify(decodedContractData))
  synchronizationInProgress.set(false)

  infoMessage.set('Marketplace data are up to date');
  return decodedContractData
}

export async function getLaunchpadManagerState(): Promise<DecodedState[]>  {
  // If session already have loaded state return it
  const sessionLaunchpadManager = launchpadManagerState.get();
  if (sessionLaunchpadManager) {
    return sessionLaunchpadManager;
  }

  const loadedLaunchpadManagerState = loadNewestLaunchpadManagerState()

  // If user created new session try to use cached data to swap them later with newest
  const cachedLaunchpadManager = localStorage.getItem('launchpadManagerState')
  if (cachedLaunchpadManager) {
    const parseLaunchpadManagerState = JSON.parse(cachedLaunchpadManager)
    launchpadManagerState.set(parseLaunchpadManagerState)
  }

  return await loadedLaunchpadManagerState
}

async function loadNewestLaunchpadManagerState(): Promise<DecodedState[]> {
  infoMessage.set('Syncing your launchpad data');
  synchronizationInProgress.set(true)

  const launchpadManager = await getLaunchpadManager();
  const contractData = await getAllContractStateWithoutPagination(
    launchpadManager
  );
  const decodedContractData = decodeState(contractData)

  // Cache latest contract data
  launchpadManagerState.set(decodedContractData)
  localStorage.setItem('launchpadManagerState', JSON.stringify(decodedContractData))
  synchronizationInProgress.set(false)

  infoMessage.set('Launchpad data are up to date');
  return decodedContractData
}

export async function reloadCollectionManagerState(){
  collectionManagerState.set(undefined)
  await getCollectionManagerState()
}

export async function reloadMarketplaceManagerState(){
  collectionManagerState.set(undefined)
  await getMarketplaceManagerState()
}

export async function reloadLaunchpadManagerState(){
  collectionManagerState.set(undefined)
  await getLaunchpadManagerState()
}

export async function getCollectionState(collectionAddress: string)  {
  const contractData = await getAllContractStateWithoutPagination(
    collectionAddress
  );
  const decodedContractData = decodeState(contractData)

  return decodedContractData
}