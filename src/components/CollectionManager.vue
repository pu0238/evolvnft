<template>
  <div>
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
      v-else
      :collections="collections"
      @collectionDetails="(address: string) => openCollection(address)"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from '@nanostores/vue';
import { COLLECTION_MANAGER_CONTRACT_ADDRESS } from '../utils/constant';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import CollectionItem from './CollectionItem.vue';
import { isWalletConnected } from '../state/walletState';
import { computed } from 'vue';
import { getArchwaySigner, isWallet } from '../utils/wallet';
import CollectionsList from './CollectionsList.vue';
import SingleCollection from './SingleCollection.vue';
import CollectionTokens from './CollectionTokens.vue';

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
      const data = await archwaySigner.queryContractSmart(
        COLLECTION_MANAGER_CONTRACT_ADDRESS,
        {
          list_user_collections,
        },
      );
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
