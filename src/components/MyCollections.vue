<template>
  <CollectionDetails
    v-if="collectionAddress"
    :collectionAddress="collectionAddress"
    @back="collectionAddress = undefined"
  />
  <CollectionsList
    v-else
    :collections="collections"
    @collectionDetails="(address: string) => openCollection(address)"
  />
</template>

<script lang="ts">
import { isWalletConnected } from '../state/walletState';
import { getWalletCollections } from '../utils/evolve';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import CollectionsList from './CollectionsList.vue';
import CollectionDetails from './CollectionDetails.vue';

export default {
  components: {
    CollectionsList,
    CollectionDetails,
  },
  data() {
    return {
      collections: [] as CollectionEntitie[],
      collectionAddress: undefined as string | undefined,
    };
  },
  methods: {
    openCollection(address: string) {
      this.collectionAddress = address;
    },
  },
  async mounted() {
    if (isWalletConnected) {
      const collections = await getWalletCollections();
      collections && (this.collections = collections);
    } else {
    }
  },
};
</script>
