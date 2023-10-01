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
      :tokensCount="collections.length"
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
import CollectionItem from './CollectionItem.vue';
import { walletSignerAddress } from '../state/walletState';
import { ref } from 'vue';
import { isWallet } from '../utils/wallet';
import CollectionsList from './CollectionsList.vue';
import SingleCollection from './SingleCollection.vue';
import CollectionTokens from './CollectionTokens.vue';
import HeaderSubtitle from './HeaderSubtitle.vue';
import { getCollectionsOwnedByAddress } from '../utils/evolve';
import type { CollectionData } from '../utils/types/CollectionData';

export default {
  data() {
    return {
      collections: [] as CollectionData[],
      collectionAddress: undefined as string | undefined,
      singleCollection: undefined as CollectionData | undefined,
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
  },
  async setup() {
    isWallet();
    const $walletSignerAddress = useStore(walletSignerAddress);
    if (!$walletSignerAddress.value) return {};

    const collections = ref(
      await getCollectionsOwnedByAddress($walletSignerAddress.value),
    );

    return {
      collections,
    };
  },
};
</script>
