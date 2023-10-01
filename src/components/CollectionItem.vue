<template>
  <div class="relative">
    <img
      class="w-32 lg:w-40 mx-auto rounded-xl"
      :src="collectionImg"
      alt="Collection image"
      draggable="false"
    />
    <h3
      class="font-cal mt-2 mb-1 text-white absolute left-1 top-[5.25rem] lg:top-[7rem] bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-lg"
    >
      <span class="mr-1">{{ collectionTitle }}</span>
      <span class="text-white/50" v-if="displayTokenCount">{{
        tokensCount
      }}</span>
    </h3>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  props: {
    collectionImg: {
      type: String,
      default: () => '/evolvnft-collection-logo.svg',
      required: false,
    },
    collectionSymbol: {
      type: String,
      default: () => 'EN',
      required: false,
    },
    collectionTitle: {
      type: String,
      default: () => 'Evolv NFT',
      required: false,
    },
    tokensCount: {
      type: Number,
    },
    displayTokenCount: {
      type: Boolean,
      required: false,
      default: () => true,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
