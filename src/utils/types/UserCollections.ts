export interface UserCollections {
  collections: UserCollection[];
  collectionsScanned: number;
}

export interface UserCollection {
  address: string;
  name: any;
  tokens: {
    [key: string]: {
      owner: string,
      approvals: any,
      token_uri: string,
      extension: any
    };
  };
}
