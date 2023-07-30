import type { TxData } from "./TxData";
import type { TxResponse } from "./TxResponse";

export interface TxQuery {
    txs: TxData[];
    tx_responses: TxResponse[];
    pagination: {
      next_key: string;
      total: string;
    };
    total: string;
  }