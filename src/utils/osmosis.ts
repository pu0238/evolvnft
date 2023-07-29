import { useStore } from '@nanostores/vue';
import { archPrice } from '../state/price';

export async function getArchPrice() {
  const archToOsmoRatio = await calculateOsmoToArchRatio();
  const archToUsdcRatio = await calculateOsmoToUsdcRatio();
  const usdcTousd = await getUsdcPrice();

  return archToUsdcRatio * archToOsmoRatio * usdcTousd;
}
async function calculateOsmoToArchRatio() {
  const result = await fetch(
    'https://lcd-osmosis.keplr.app/osmosis/gamm/v1beta1/pools/1061',
  );
  const data = await result.json();

  const arch = data.pool.pool_assets.find(
    (element: any) =>
      element.token.denom ===
      'ibc/23AB778D694C1ECFC59B91D8C399C115CC53B0BD1C61020D8E19519F002BDD85',
  );

  const osmo = data.pool.pool_assets.find(
    (element: any) => element.token.denom === 'uosmo',
  );

  const archAmount = Number(arch.token.amount) / 1000000000000000000;
  const osmoAmount = Number(osmo.token.amount) / 1000000;
  return osmoAmount / archAmount;
}

async function calculateOsmoToUsdcRatio() {
  const result = await fetch(
    'https://lcd-osmosis.keplr.app/osmosis/gamm/v1beta1/pools/678',
  );
  const data = await result.json();

  const usdc = data.pool.pool_assets.find(
    (element: any) =>
      element.token.denom ===
      'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858',
  );

  const osmo = data.pool.pool_assets.find(
    (element: any) => element.token.denom === 'uosmo',
  );

  const usdcAmount = Number(usdc.token.amount) / 1000000;
  const osmoAmount = Number(osmo.token.amount) / 1000000;
  return usdcAmount / osmoAmount;
}

async function getUsdcPrice() {
  const result = await fetch(
    'https://prices.osmosis.zone/api/v3/simple/price?ids=usd-coin&vs_currencies=usd',
  );
  const data = await result.json();

  return data['usd-coin'].usd;
}
 