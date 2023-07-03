import { GasPrice } from '@cosmjs/stargate';

const CURRENCY = {
  coinDenom: 'CONST',
  coinMinimalDenom: 'aconst',
  coinDecimals: 18,
  coinGeckoId: 'constantine-network',
};

export const CONSTANTINE_INFO = {
  chainId: 'constantine-3',
  chainName: 'Constantine',
  rpc: 'https://rpc.constantine.archway.tech',
  rest: 'https://api.constantine.archway.tech',
  stakeCurrency: CURRENCY,
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
  currencies: [CURRENCY],
  feeCurrencies: [CURRENCY],
  coinType: 118,
  features: ['cosmwasm', 'ibc-transfer', 'ibc-go'],
};

export const CARNISTER_API_URL =
  'https://w4j6g-nyaaa-aaaao-aixyq-cai.raw.icp0.io/v1';

export const SYSTEM_CONTEXT_CONTRACT_ADDRESS =
  'archway1tpynf83l3asf09yhtknrpmrshqmha35cm5xm2z8r96lysgypsp5s0jzdvp';
