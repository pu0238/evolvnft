<template>
  <a
    class="mx-1 relative ease-out duration-300 hover:z-10"
    :href="`/marketplace#${collection}`"
    @click="$emit('openMetadata', metadata)"
  >
    <div
      class="hover:scale-105 bg-black w-40 rounded-[18px] ease-out duration-300"
    >
      <img
        v-if="metadata && metadata.image"
        draggable="false"
        class="w-40 h-40 rounded-t-2xl overflow-clip"
        :src="metadata.image"
      />
      <div class="w-40 h-40 flex justify-center items-center" v-else>
        <img
          draggable="false"
          class="w-28 h-28 rounded-t-2xl"
          src="/evolvnft-collection-logo.svg"
        />
      </div>
      <div class="text-white grid mx-3 pt-1 pb-2 items-center">
        <span class="font-cal"># {{ tokenId }}</span>
        <span class="font-josefin flex">
          <img :src="denomLogo" class="w-4" />
          <span class="ml-1">{{ price }}</span>
        </span>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { getNftInfo } from '../utils/evolve';

export default {
  data() {
    return {
      metadataUrl: undefined as undefined | string,
      metadata: undefined as undefined | any,
    };
  },
  props: {
    denomLogo: {
      type: String,
      default: () => 'arch-logo.svg',
    },
    price: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    collection: {
      type: String,
      required: true,
    },
    openMetadata: {
      type: Function,
    },
  },
  emits: ['openMetadata'],
  methods: {
    async getMetadata(url: string) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
  },
  async mounted() {
    this.metadataUrl = await getNftInfo(this.collection, this.tokenId);
    this.metadataUrl =
      'https://ipfs.io/ipfs/QmasVYPJuqq38uuckrxsXPWvdcb27MLej8LUgVnZUPDGWp/8888.json';
    this.getMetadata(this.metadataUrl).then((res) => (this.metadata = res));
    //this.metadata = await this.getMetadata(this.metadataUrl);
    //console.log(this.metadata);
  },
};
</script>
