<template>
  <div
    class="bg-black border border-black float-left p-6 lg:p-10 py-5 rounded-[2rem] w-[16rem] lg:w-80"
  >
    <div class="text-center">
      <img
        class="w-32 lg:w-40 mx-auto"
        :src="collectionImg"
        alt="Collection image"
      />
      <h3 class="font-cal text-xl lg:text-2xl mt-2 mb-1 text-white">
        {{ collectionTitle }}
      </h3>
      <p class="font-josefin text-zinc-400">{{ collectionSymbol }}</p>
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
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
