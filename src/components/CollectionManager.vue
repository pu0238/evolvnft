<template>
  <div class="w-full">
    <SingleCollection
      v-if="collectionAddress && !singleCollection"
      :collectionAddress="collectionAddress"
      @back="collectionAddress = undefined"
      @singleCollection="(col: any) => (singleCollection = col)"
    />
    <CollectionTokens
      v-else-if="collectionAddress && singleCollection"
      :singleCollection="singleCollection"
      @back="singleCollection = undefined"
    />
    <CollectionsList
      v-else-if="collections.length > 0"
      :collections="collections"
      @collectionDetails="(address: string) => openCollection(address)"
    />
    <div v-else>
      <div class="flex">
        <h1
          class="text-5xl xl:text-6xl 2xl:text-7xl font-cal text-black mx-auto"
        >
          <span class="text-indigo-500">No</span> collections
          <span class="text-indigo-500">found</span>
        </h1>
      </div>
      <div class="flex">
        <HeaderSubtitle
          class="mx-auto"
          content="make sure your wallet is connected!"
        />
      </div>
    </div>
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
import HeaderSubtitle from "./HeaderSubtitle.vue";

export default {
  data() {
    return {
      collections: [] as CollectionEntitie[],
      collectionAddress: undefined as string | undefined,
      singleCollection: undefined as CollectionEntitie | undefined,
    };
  },
  components: {
    CollectionItem,
    CollectionsList,
    SingleCollection,
    CollectionTokens,
    HeaderSubtitle,
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
    if (isWalletConnected) {
      const collections = await this.getWalletCollections();
      collections && (this.collections = collections);
    }
  },
  setup() {
    isWallet();
    const $collectionDescription = useStore(isWalletConnected);

    return {
      isWalletConnected: computed(() => $collectionDescription.value),
    };
  },
  watch: {
    singleCollection: function (a) {},
  },
};
</script>
