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

export const DEFAULT_GAS_PRICE = GasPrice.fromString('0.02uconst');

export const CARNISTER_API_URL =
  'https://w4j6g-nyaaa-aaaao-aixyq-cai.raw.icp0.io/v1';

export const COLLECTION_MANAGER_CONTRACT_ADDRESS =
  'archway1xnulf405laafzr0u4urpstwlzl55vvdnwenm4f2djanq5frsypyqsjwj4x';
export const LAUNCHPAD_MANAGER_CONTRACT_ADDRESS =
  'archway1rll06439f3y506xsnmuukzt72n7ls8l4qytspc6hac6m4du84jvqc9xqp4';
export const SYSTEM_CONTEXT_CONTRACT_ADDRESS =
  'archway1hxkyhz23wzzpp5anmj0j8dk9hmm706e4yu4y39sfj9tzqmec70eq0ff077';
