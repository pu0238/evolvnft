const NETWORK = (import.meta.env.PUBLIC_NETWORK || 'TESTNET') as
  | 'TESTNET'
  | 'MAINNET';

const SYSTEM_CONTEXT_CONTRACT_ADDRESSES = {
  PUBLIC_SYSTEM_CONTEXT_CONTRACT_ADDRESS_TESTNET:
    'archway1tpynf83l3asf09yhtknrpmrshqmha35cm5xm2z8r96lysgypsp5s0jzdvp',
  PUBLIC_SYSTEM_CONTEXT_CONTRACT_ADDRESS_MAINNET:
    'archway1ewk09pl9hvgegwydttnkeldhkudu7xxcqkx7xdfg8ht75n4kpldsju8wxc',
};

const gasPriceStep = { low: 0, average: 0.1, high: 0.2 };

const CONSTANTINE_CURRENCY = {
  coinDenom: 'const',
  coinMinimalDenom: 'aconst',
  coinDecimals: 18,
  coinGeckoId: 'constantine-network',
};

export const TESTNET = {
  chainId: 'constantine-3',
  chainName: 'Constantine',
  chainSymbolImageUrl:
    'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/chain.png',
  rpc: 'https://rpc.constantine.archway.tech',
  wss: 'wss://rpc.constantine.archway.tech',
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
  feeCurrencies: [{ ...CONSTANTINE_CURRENCY, gasPriceStep }],
  coinType: 118,
  features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
  nodeProvider: {
    name: 'Phi Labs',
    email: 'support@philabs.xyz',
    website: 'https://philabs.xyz',
  },
  walletUrlForStaking: 'https://wallet.keplr.app/chains/archway',
};

const ARCH_CURRENCY = {
  coinDecimals: 18,
  coinDenom: 'ARCH',
  coinGeckoId: 'archway',
  coinMinimalDenom: 'aarch',
};

export const MAINNET = {
  chainId: 'archway-1',
  chainName: 'archway',
  chainSymbolImageUrl:
    'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/archway/chain.png',
  rpc: 'https://rpc.mainnet.archway.io',
  wss: 'wss://rpc.mainnet.archway.io',
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
  feeCurrencies: [{ ...ARCH_CURRENCY, gasPriceStep }],
  coinType: 118,
  features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
  nodeProvider: {
    name: 'Phi Labs',
    email: 'support@philabs.xyz',
    website: 'https://philabs.xyz',
  },
  walletUrlForStaking: 'https://wallet.keplr.app/chains/archway',
};

const networksData = { TESTNET, MAINNET };

export const CARNISTER_API_URL =
  'https://w4j6g-nyaaa-aaaao-aixyq-cai.raw.icp0.io/v1';

export const NETWORK_INFO = networksData[NETWORK];

export const BLOCKCHAIN_SCAN =
  NETWORK === 'TESTNET'
    ? 'https://testnet.mintscan.io/archway-testnet/'
    : 'https://www.mintscan.io/archway/';
export const BLOCKCHAIN_SCAN_TXS = `${BLOCKCHAIN_SCAN}txs/`;
export const BLOCKCHAIN_SCAN_ACCOUNT = `${BLOCKCHAIN_SCAN}account/`;

export const SYSTEM_CONTEXT_CONTRACT_ADDRESS =
  SYSTEM_CONTEXT_CONTRACT_ADDRESSES[
    ('PUBLIC_SYSTEM_CONTEXT_CONTRACT_ADDRESS_' + NETWORK) as
      | 'PUBLIC_SYSTEM_CONTEXT_CONTRACT_ADDRESS_TESTNET'
      | 'PUBLIC_SYSTEM_CONTEXT_CONTRACT_ADDRESS_MAINNET'
  ];

export const MINIMUM_LISTING_PRICE = 0.001;
