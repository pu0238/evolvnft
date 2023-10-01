<template>
  <CollectionDetails
    v-if="collection"
    :collection="collection"
    @back="collection = undefined"
  />
  <CollectionsList
    v-else
    v-if="collections"
    :collections="collections"
    :displayTokenCount="false"
    @collectionDetails="(col: CollectionData) => openCollection(col)"
  />
</template>

<script lang="ts">
import { isWalletConnected, walletSignerAddress } from '../state/walletState';
import { getCollectionsOwnedByAddress } from '../utils/evolve';
import CollectionsList from './CollectionsList.vue';
import CollectionDetails from './CollectionDetails.vue';
import { getArchwaySigner, isWallet } from '../utils/wallet';
import { useStore } from '@nanostores/vue';
import { computed } from 'vue';
import type { CollectionData } from '../utils/types/CollectionData';
import { ownedUserCollections } from '../state/dashboard';
import { infoMessage } from '../state/error';

export default {
  components: {
    CollectionsList,
    CollectionDetails,
  },
  data() {
    return {
      collection: undefined as undefined | CollectionData,
    };
  },
  methods: {
    openCollection(col: CollectionData) {
      this.collection = col;
    },
  },
  async setup() {
    isWallet();
    const $walletSignerAddress = useStore(walletSignerAddress);
    const $ownedUserCollections = useStore(ownedUserCollections);
    if (!$walletSignerAddress.value) return {};

    infoMessage.set('Syncing your collections');
    getCollectionsOwnedByAddress($walletSignerAddress.value).then(() =>
      infoMessage.set('Your collections are up to date'),
    );

    if (!$ownedUserCollections.value) return {};

    return {
      collections: computed(() => $ownedUserCollections.value),
    };
  },
};
</script>
