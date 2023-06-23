<template>
  <div
    class="float-left p-4 lg:p-8 py-5 rounded-[2rem] w-64 md:w-56 lg:w-72 border-4"
    :class="{ 'cursor-pointer': active }"
  >
    <div class="text-center">
      <img
        class="h-24 lg:h-32 xl:h-36 mx-auto"
        :src="collectionImg"
        alt="Collection image"
      />
      <h3
        class="font-cal text-xl lg:text-2xl mt-4 mb-1 text-black"
        :class="{ 'text-black': active, 'text-gray-400': !active }"
      >
        {{ collectionTitle }}
      </h3>
      <p class="font-josefin text-zinc-400">{{ collectionDescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  props: {
    collectionImg: {
      type: String,
      default: () => '/mint-black.svg',
      required: false,
    },
    collectionDescription: {
      type: String,
      default: () => 'Mint any amount of NFT from your collection',
      required: false,
    },
    collectionTitle: {
      type: String,
      default: () => 'mint NFT',
      required: false,
    },
    active: {
      type: Boolean,
      default: () => true,
      required: false,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
