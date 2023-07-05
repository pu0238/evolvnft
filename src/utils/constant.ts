const NETWORK = import.meta.env.PUBLIC_NETWORK;

const CONSTANTINE_CURRENCY = {
  coinDenom: 'CONST',
  coinMinimalDenom: 'aconst',
  coinDecimals: 18,
  coinGeckoId: 'constantine-network',
};

export const TESTNET = {
  chainId: 'constantine-3',
  chainName: 'Constantine',
  rpc: 'https://rpc.constantine.archway.tech',
  rest: 'https://api.constantine.archway.tech',
  stakeCurrency: CONSTANTINE_CURRENCY,
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'archway',
    bech32PrefixAccPub: 'archwaypub',
    bech32PrefixValAddr: 'archwayvaloper',
    bech32PrefixValPub: 'archwayvaloperpub',
    bech32PrefixConsAddr: 'archwayvalcons',
    bech32PrefixConsPub: 'archwayvalconspub',
  },
  currencies: [CONSTANTINE_CURRENCY],
  feeCurrencies: [CONSTANTINE_CURRENCY],
  coinType: 118,
  features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
};

const ARCH_CURRENCY = {
  coinDenom: 'arch',
  coinMinimalDenom: 'aarch',
  coinDecimals: 18,
};

export const MAINNET = {
  chainId: 'archway-1',
  chainName: 'archway',
  rpc: 'https://rpc.mainnet.archway.io',
  rest: 'https://api.mainnet.archway.io',
  stakeCurrency: ARCH_CURRENCY,
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'archway',
    bech32PrefixAccPub: 'archwaypub',
    bech32PrefixValAddr: 'archwayvaloper',
    bech32PrefixValPub: 'archwayvaloperpub',
    bech32PrefixConsAddr: 'archwayvalcons',
    bech32PrefixConsPub: 'archwayvalconspub',
  },
  currencies: [ARCH_CURRENCY],
  feeCurrencies: [ARCH_CURRENCY],
  coinType: 118,
  features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
};

const networksData = { TESTNET, MAINNET };
export const CARNISTER_API_URL =
  'https://w4j6g-nyaaa-aaaao-aixyq-cai.raw.icp0.io/v1';

export const NETWORK_INFO =
  networksData[import.meta.env.PUBLIC_NETWORK as 'TESTNET' | 'MAINNET'];
export const SYSTEM_CONTEXT_CONTRACT_ADDRESS = import.meta.env[
  'PUBLIC_SYSTEM_CONTEXT_CONTRACT_ADDRESS_' + NETWORK
];

console.log(SYSTEM_CONTEXT_CONTRACT_ADDRESS)