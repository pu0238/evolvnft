export interface TxResponse {
    height: string;
    txhash: string;
    codespace: string;
    code: number;
    data: string;
    raw_log: string;
    logs: {
      msg_index: number;
      log: string;
      events: {
        type: string;
        attributes: {
          key: string;
          value: string;
        }[];
      }[];
    }[];
    info: string;
    gas_wanted: string;
    gas_used: string;
    tx: {
      type_url: string;
      value: string;
    };
    timestamp: string;
    events: {
      type: string;
      attributes: {
        key: string;
        value: string;
        index: true;
      }[];
    }[];
  }