<template>
  <div class="flex w-full flex-wrap-reverse xl:flex-nowrap">
    <div class="flex-auto mt-4 xl:mt-20 mx-10">
      <ExpandableMint
        :collectionAddress="collection.address"
        :collection="collection"
      />
      <ExpandableRewards
        :collectionAddress="collection?.address"
        :rewardPercentage="collection?.rewards_percentage_fee"
        :splitRewards="false"
      />
      <ExpandableLaunchpad
        :collectionAddress="collection.address"
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
        :accumulatedRewards="accumulatedRewards"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CollectionBaner from './CollectionBaner.vue';
import Button from './Button.vue';
import BlackExpandable from './BlackExpandable.vue';
import ExpandableMint from './ExpandableMint.vue';
import ExpandableRewards from './ExpandableRewards.vue';
import ExpandableLaunchpad from './ExpandableLaunchpad.vue';
import type { CollectionData } from '../utils/types/CollectionData';
import { computed, type PropType } from 'vue';
import { getAllRewards } from '../utils/evolve';

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
  props: {
    collection: {
      type: Object as PropType<CollectionData>,
      required: true,
    },
  },
  async setup(props) {
    const accumulatedRewards = await getAllRewards(props.collection.address);
    return {
      accumulatedRewards: computed(() => accumulatedRewards),
    };
  },
};
</script>
