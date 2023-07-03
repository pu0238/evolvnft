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
import { useStore } from '@nanostores/vue';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import CollectionItem from './CollectionItem.vue';
import { isWalletConnected } from '../state/walletState';
import { computed } from 'vue';
import { isWallet } from '../utils/wallet';
import CollectionsList from './CollectionsList.vue';
import SingleCollection from './SingleCollection.vue';
import CollectionTokens from './CollectionTokens.vue';
import HeaderSubtitle from './HeaderSubtitle.vue';
import { getArchwaySigner } from '../utils/wallet';
import { getCollectionManager } from '../utils/evolve';

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
      const { signerAddress, archwaySigner } = await getArchwaySigner();
      const list_user_collections = {
        address: signerAddress,
      };

      const collectionManagerContract = await getCollectionManager();
      const data = await archwaySigner.queryContractSmart(
        collectionManagerContract,
        {
          list_user_collections,
        },
      );
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
};
</script>
