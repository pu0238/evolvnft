<template>
  <Suspense v-if="location.hash?.length === 67">
    <CollectionMarketplace
      :collectionAddress="location.hash.slice(1)"
    />
  </Suspense>
  <div class="grid" v-else>
    <MarketplaceHeader />
    <Suspense>
      <MarketplaceContainer />
    </Suspense>
  </div>
</template>

<script lang="ts">
import MarketplaceHeader from './MarketplaceHeader.vue';
import MarketplaceContainer from './MarketplaceContainer.vue';
import CollectionMarketplace from './CollectionMarketplace.vue';

// @ts-ignore
import { useBrowserLocation } from '@vueuse/core';
export default {
  components: {
    MarketplaceHeader,
    MarketplaceContainer,
    CollectionMarketplace,
  },
  setup() {
    const location = useBrowserLocation();
    return { location };
  },
};
</script>
