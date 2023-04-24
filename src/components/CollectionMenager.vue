<template>
  <div>
    <SingleCollection
      v-if="collectionAddress && !tokens"
      :collectionAddress="collectionAddress"
      @back="collectionAddress = undefined"
      @tokens="(tokensData: any) => (tokens = tokensData)"
    />
    <CollectionTokens v-else-if="collectionAddress && tokens" :tokens="tokens" @back="tokens = undefined"/>
    <CollectionsList
      v-else
      :collections="collections"
      @collectionDetails="(address: string) => openCollection(address)"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from "@nanostores/vue";
import {
  CONSTANTINE_INFO,
  CONTRACT_ADDRESS,
  DEFAULT_SIGNING_CLIENT_OPTIONS,
} from "../utils/constant";
import type { CollectionEntitie } from "../utils/types/CollectionItem";
import CollectionItem from "./CollectionItem.vue";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { isWalletConnected } from "../state/walletState";
import { computed } from "vue";
import { isWallet } from "../utils/wallet";
import CollectionsList from "./CollectionsList.vue";
import SingleCollection from "./SingleCollection.vue";
import CollectionTokens from "./CollectionTokens.vue";

export default {
  data() {
    return {
      collections: [] as CollectionEntitie[],
      collectionAddress: undefined as string | undefined,
      tokens: undefined as string | undefined,
    };
  },
  components: {
    CollectionItem,
    CollectionsList,
    SingleCollection,
    CollectionTokens
  },
  methods: {
    openCollection(address: string) {
      this.collectionAddress = address;
    },
    async getWalletCollections(): Promise<void | CollectionEntitie[]> {
      const offlineSigner = window.keplr?.getOfflineSigner(
        CONSTANTINE_INFO.chainId
      );
      if (!offlineSigner) {
        return console.error("Failed to create offline signer");
      }
      const accounts = await offlineSigner.getAccounts();
      const list_user_collections = {
        address: accounts[0].address,
      };
      const cosmSigner = await SigningArchwayClient.connectWithSigner(
        CONSTANTINE_INFO.rpc,
        offlineSigner,
        {
          ...DEFAULT_SIGNING_CLIENT_OPTIONS,
          prefix: CONSTANTINE_INFO.stakeCurrency.coinDenom,
        }
      );
      const data = await cosmSigner.queryContractSmart(CONTRACT_ADDRESS, {
        list_user_collections,
      });
      return data;
    },
  },
  async mounted() {
    const collections = await this.getWalletCollections();
    collections && (this.collections = collections);
  },
  setup() {
    isWallet();
    const $collectionDescription = useStore(isWalletConnected);

    return {
      isWalletConnected: computed(() => $collectionDescription.value),
    };
  },
};
</script>
