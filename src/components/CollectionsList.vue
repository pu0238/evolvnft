<template>
  <div class="w-full flex">
    <ul class="mt-10 mx-auto flex flex-wrap justify-center gap-2">
      <li
        v-for="col in (collections as CollectionData[])"
        @click="$emit('collectionDetails', col)"
        class="cursor-pointer flex p-5 bg-black border border-black rounded-3xl w-[10.5rem] lg:w-[12.25rem]"
      >
        <CollectionItem
          :collectionTitle="col.name"
          :collectionSymbol="col.symbol"
          :collectionImg="col.thumbnail || undefined"
          :tokensCount="col.tokens ? Object.keys(col.tokens).length : undefined"
          :displayTokenCount="displayTokenCount"
          class="float-left"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { CollectionData } from '../utils/types/CollectionData';
import CollectionItem from './CollectionItem.vue';

export default {
  components: {
    CollectionItem,
  },
  props: {
    collectionDetails: {
      type: Function,
      required: false,
    },
    collections: {
      required: true,
    },
    displayTokenCount: {
      type: Boolean,
      required: false,
      default: () => true,
    },
  },
  emits: ['collectionDetails'],
};
</script>
