<template>
  <div
    class="w-full bg-black grid lg:flex flex-nowrap text-white py-16 px-12 rounded-2xl"
  >
    <div
      class="flex-1 grid sm:flex flex-nowrap lg:min-w-[31rem] xl:min-w-[50%] xl:max-w-[50%]"
    >
      <img
        draggable="false"
        class="w-36 m-auto"
        :src="
          collectionData.thumbnail
            ? collectionData.thumbnail
            : 'evolvnft-collection-logo.svg'
        "
      />
      <div class="sm:ml-8 sm:min-w-[20rem] flex-1">
        <h2 class="font-cal text-2xl mt-4 sm:mt-1 mb-3">
          {{ collectionData.name }}
        </h2>
        <div class="grid sm:grid-cols-2 font-josefin text-xs w-full gap-[5px]">
          <div
            v-if="floor"
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
          >
            <span class="flex-1">floor</span>
            <span class="flex">
              <img :src="denomLogo" class="w-4 mr-[2px]" />
              {{ aarchToArch(Number(floor)) }}
            </span>
          </div>
          <div
            v-if="collectionData.limit"
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
          >
            <span class="flex-1">supply</span>
            <span>{{ collectionData.limit }}</span>
          </div>
          <div
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
            v-if="avgSale"
          >
            <span class="flex-1">avg. sale 24h</span>
            <span class="flex"
              ><img :src="denomLogo" class="w-4 mr-[2px]" />{{ avgSale }}</span
            >
          </div>
          <div class="bg-zinc-900 px-4 py-2 rounded-full flex items-center">
            <span class="flex-1">owners</span>
            <span>{{ ownersCount }}</span>
          </div>
          <div
            v-if="listed !== undefined"
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
          >
            <span class="flex-1">listed</span>
            <span>{{ listed }}</span>
          </div>
          <div
            v-if="collectionData.rewards_percentage_fee"
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
          >
            <span class="flex-1">rewards</span>
            <span>{{ collectionData.rewards_percentage_fee / 100 }} %</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <p class="my-8 sm:mx-8 font-josefin text-sm float-left">
        {{ collectionData.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import { aarchToArch, toFixed } from '../utils/arch';

export default {
  data() {
    return {
      ownersCount: 0,
    };
  },
  props: {
    denomLogo: {
      type: String,
      default: () => '/arch-logo.svg',
    },
    collectionData: {
      type: Object as PropType<CollectionEntitie>,
      required: true,
    },
    floor: {
      type: Number,
      required: false,
    },
    avgSale: {
      type: Number,
      required: false,
    },
    listed: {
      type: Number,
      required: false,
    },
  },
  methods: {
    aarchToArch,
    toFixed,
  },
  async mounted() {
    const tokens = this.collectionData.tokens;
    if (tokens) {
      const owners = Object.values(tokens).map((item) => item.owner);
      this.ownersCount = new Set(owners).size;
    }
  },
};
</script>
