export interface TxData {
  body: {
    messages: {
      type_url: string;
      value: string;
    }[];
    memo: string;
    timeout_height: string;
    extension_options: {
      type_url: string;
      value: string;
    }[];
    non_critical_extension_options: {
      type_url: string;
      value: string;
    }[];
  };
  auth_info: {
    signer_infos: {
      public_key: {
        type_url: string;
        value: string;
      };
      mode_info: {
        single: {
          mode: 'SIGN_MODE_UNSPECIFIED';
        };
        multi: {
          bitarray: {
            extra_bits_stored: number;
            elems: string;
          };
          mode_infos: {
            single: {
              mode: 'SIGN_MODE_UNSPECIFIED';
            };
            multi: {
              bitarray: {
                extra_bits_stored: number;
                elems: string;
              };
              mode_infos: string[];
            };
          }[];
        };
      };
      sequence: string;
    }[];
    fee: {
      amount: {
        denom: string;
        amount: string;
      }[];
      gas_limit: string;
      payer: string;
      granter: string;
    };
    tip: {
      amount: {
        denom: string;
        amount: string;
      }[];
      tipper: string;
    };
  };
  signatures: string[];
}
