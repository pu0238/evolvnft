<template>
  <div class="grid sm:flex w-full">
    <div class="flex-auto mt-20 mx-10">
      <BlackExpandable title="mint NFT">df</BlackExpandable>
      <BlackExpandable title="mint NFT">df</BlackExpandable>
      <BlackExpandable title="mint NFT">df</BlackExpandable>

    </div>
    <div class="hidden xl:grid xl:order-last mx-auto">
      <Button
        content="back"
        arrow="left"
        color="black"
        class="mb-4 flex-none ml-auto"
        @click="$emit('back')"
      />
      <CollectionBaner
        class="xl:h-[40rem]"
        bgColor="black"
        :collectionImg="collection?.thumbnail || undefined"
        :collectionTitle="collection?.name"
        :collectionDescription="collection?.description"
        :collectionSymbol="collection?.symbol"
        :rewardsPercentageFee="collection?.rewards_percentage_fee"
        :accumulatedRewards="collection?.accumulated_rewards"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { getCollection } from '../utils/evolve';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import CollectionBaner from './CollectionBaner.vue';
import Button from './Button.vue';
import BlackExpandable from './BlackExpandable.vue';

export default {
  emits: ['back'],
  components: {
    CollectionBaner,
    Button,
    BlackExpandable
  },
  data() {
    return {
      collection: undefined as unknown as CollectionEntitie,
    };
  },
  props: {
    collectionAddress: {
      type: String,
      required: true,
    },
  },
  methods: {
    async loadCollectionData() {
      if (this.collectionAddress) {
        const collectionData = await getCollection(this.collectionAddress);
        if (collectionData) {
          this.collection = collectionData;
        }
      }
    },
  },
  async mounted() {
    await this.loadCollectionData();
  },
};
</script>
