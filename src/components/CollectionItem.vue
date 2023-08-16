<template>
  <div
    class="bg-black border border-black float-left p-6 lg:p-5 py-5 rounded-3xl"
  >
    <div class="relative">
      <img
        class="w-32 lg:w-40 mx-auto rounded-xl"
        :src="collectionImg"
        alt="Collection image"
        draggable="false"
      />
      <h3 class="font-cal mt-2 mb-1 text-white absolute left-1 bottom-0 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-lg">
        <span class="mr-1">{{ collectionTitle }}</span> <span class="text-white/50">{{ tokensCount }}</span>
      </h3>
    </div>
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
      type: Number
    }
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
