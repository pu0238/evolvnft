<template>
  <div v-if="collectionAddress">{{ collectionAddress }}</div>
  <CollectionsList
    v-else
    v-if="userCollections"
    :collections="userCollections"
    @collectionDetails="(address: string) => openCollection(address)"
  />
</template>

<script lang="ts">
import {
  getCollection,
  getOwnedTokens,
  getOwnedTokensIds,
} from '../utils/evolve';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import { getArchwaySigner } from '../utils/wallet';
import CollectionsList from './CollectionsList.vue';

export default {
  components: {
    CollectionsList,
  },
  data() {
    return {
      userCollections: undefined as undefined | CollectionEntitie[],
      collectionAddress: undefined as string | undefined,
    };
  },
  methods: {
    async loadOwnedTokens() {
      const { signerAddress } = await getArchwaySigner();
      const collectionsAddresses = await getOwnedTokens(signerAddress);
      console.log(collectionsAddresses)
      this.userCollections = await Promise.all(
        collectionsAddresses.collections.map((col) =>
          getCollection(col.address),
        ),
      );
    },
    async openCollection(address: string) {
      const { signerAddress } = await getArchwaySigner();
      this.collectionAddress = address;
      console.log(await getOwnedTokensIds(address, signerAddress));
    },
  },
  async mounted() {
    await this.loadOwnedTokens();
  },
};
</script>
