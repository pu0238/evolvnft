<template>
  <div class="bg-white border float-left p-6 lg:p-10 py-5 rounded-[2rem] w-[16rem] lg:w-80">
    <div class="text-center">
      <img class="w-32 lg:w-40 mx-auto" :src="collectionImg" />
      <h3 class="font-cal text-xl lg:text-2xl mt-2 mb-1">{{ collectionTitle }}</h3>
      <p class="font-josefin text-zinc-400">{{ collectionSymbol }}</p>
    </div>
    <div class="mt-2">
      <h4 class="font-cal text-md lg:text-lg lg:mb-2">Description</h4>
      <p class="font-josefin text-zinc-400 mb-1 lg:mb-4 text-sm lg:text-base">
        {{ collectionDescription }}
      </p>
      <h4 class="font-cal text-md lg:text-lg lg:mb-2">Medifires</h4>
      <p class="font-josefin text-zinc-400 lg:mb-4">none</p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  props: {
    collectionImg: {
      type: String,
      default: "/evolvnft-collection-logo.svg",
      required: false,
    },
    collectionSymbol: {
      type: String,
      default: "EN",
      required: false,
    },
    collectionTitle: {
      type: String,
      default: "Evolv NFT",
      required: false,
    },
    collectionDescription: {
      type: String,
      default:
        "this is example description of your digital asset. it should be short and clear.",
      required: false,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
