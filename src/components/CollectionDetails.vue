<template>
  <div class="flex w-full flex-wrap-reverse xl:flex-nowrap">
    <div class="flex-auto mt-4 xl:mt-20 mx-10">
      <ExpandableMint
        :collectionAddress="collectionAddress"
        :collection="collection"
      />
      <ExpandableRewards
        :collectionAddress="collection?.address"
        :rewardPercentage="collection?.rewards_percentage_fee"
        :splitRewards="false"
      />
      <ExpandableLaunchpad
        :collectionAddress="collectionAddress"
        :collection="collection"
      />
    </div>
    <div class="grid w-full">
      <Button
        content="back"
        arrow="left"
        color="black"
        class="mb-4 float-right ml-auto w-fit h-fit"
        @click="$emit('back')"
      />
      <CollectionBaner
        class="xl:h-[40rem] mx-auto"
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
import ExpandableMint from './ExpandableMint.vue';
import ExpandableRewards from './ExpandableRewards.vue';
import ExpandableLaunchpad from './ExpandableLaunchpad.vue';

export default {
  emits: ['back'],
  components: {
    ExpandableLaunchpad,
    CollectionBaner,
    Button,
    BlackExpandable,
    ExpandableMint,
    ExpandableRewards,
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
