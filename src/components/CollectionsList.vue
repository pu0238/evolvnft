<template>
  <div class="w-full flex">
    <ul
      class="mt-10 mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <li v-for="col in (collections as CollectionEntitie[])" @click="$emit('collectionDetails', col.address)" class="cursor-pointer">
        <CollectionItem
          :collectionTitle="col.name"
          :collectionSymbol="col.symbol"
          :collectionImg="col.thumbnail || undefined"
          class="float-left"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { CollectionEntitie } from '../utils/types/CollectionItem';
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
      type: Array,
      required: true,
    },
  },
  emits: ['collectionDetails'],
};
</script>
