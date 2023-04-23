<template>
  <div class="w-full ml-8">
    <h1 class="text-5xl xl:text-6xl 2xl:text-7xl font-cal text-black">
      collections <span class="text-indigo-500">menager</span>
    </h1>
    <p class="text-lg md:text-xl 2xl:text-2xl font-josefin text-zinc-700">
      In this tab you can browse your collections!
    </p>
  </div>
  <div class="w-full flex">
    <ul
      class="mt-10 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
    >
      <li v-for="col in collections" @click="$emit('collectionDetails', col.address)">
        <a href="#">
          <CollectionItem
            :collectionTitle="col.name"
            :collectionSymbol="col.symbol"
            :collectionImg="col.thumbnail || undefined"
            class="float-left"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useStore } from "@nanostores/vue";
import {
  CONSTANTINE_INFO,
  CONTRACT_ADDRESS,
  DEFAULT_SIGNING_CLIENT_OPTIONS,
} from "../utils/constant";
import type { CollectionEntitie } from "../utils/types/CollectionItem";
import CollectionItem from "./CollectionItem.vue";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { isWalletConnected } from "../state/walletState";
import { computed } from "vue";
import { isWallet } from "../utils/wallet";

export default {
  components: {
    CollectionItem,
  },
  props: {
    collectionDetails: {
      type: Function,
      required: false,
    },
  },
  emits: ["collectionDetails"],
  props: {
    collections: {
      type: Array as Array<CollectionEntitie>,
      required: true,
    },
  },
};
</script>
