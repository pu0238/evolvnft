import BigNumber from 'bignumber.js';

export function aarchToArch(number: number): string  {
  return new BigNumber(number).div(10e17).toFixed();
}

export function archToAarch(number: number): string  {
  return new BigNumber(number).mul(10e17).toString();
}

export function toFixed(number: number): string {
  return new BigNumber(number).toFixed();
}

export function shortenArchAddress(address: string): string {
  return address.slice(0, 11) + '..' + address.slice(-4) 
}
