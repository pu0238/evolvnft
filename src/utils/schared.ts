import { infoMessage } from '../state/error';
import { BLOCKCHAIN_SCAN_TXS } from './constant';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseDate(date: number) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function parseTime(date: number) {
  return (
    new Date(date).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }) +
    ' @ ' +
    'UTC'
  );
}

export function swapElements(array: any[], index1: number, index2: number) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

export function groupBy(array: any[], groupBy: string) {
  const groups: any = {};

  array.forEach((el) => {
    if (groups[el[groupBy]]) {
      groups[el[groupBy]].push(el);
    } else {
      groups[el[groupBy]] = [el];
    }
  });

  return groups;
}

export function chainScanInfoMessage(transactionHash: string) {
  infoMessage.set(
    `<a href="${BLOCKCHAIN_SCAN_TXS}${transactionHash}" class="underline underline-offset-8">${transactionHash}</a>`,
  );
}
