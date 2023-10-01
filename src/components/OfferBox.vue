<template>
  <a
    class="mx-1 relative ease-out duration-300 hover:z-10"
    :href="marketplace ? `?tokenId=${tokenId}#${collectionAddress}` : undefined"
    @click="$emit('openMetadata', metadata)"
  >
    <div
      class="hover:scale-105 bg-black w-40 rounded-[18px] ease-out duration-300 h-full"
    >
      <img
        v-if="metadata && metadata.image"
        draggable="false"
        class="w-40 h-40 rounded-t-2xl overflow-clip"
        :src="metadata.image"
        loading="lazy"
      />
      <div class="w-40 h-40 flex justify-center items-center" v-else>
        <img
          draggable="false"
          class="w-28 h-28 rounded-t-2xl"
          src="/evolvnft-collection-logo.svg"
          loading="lazy"
        />
      </div>
      <div class="text-white grid mx-3 pt-2 pb-2 items-center text-sm">
        <p class="font-cal truncate" v-if="metadata?.name">{{ metadata.name }}</p>
        <p class="font-cal truncate" v-else># {{ tokenId }}</p>
        <span class="font-josefin flex" v-if="price">
          <img :src="denomLogo" class="w-4" />
          <span class="ml-1">{{ price }}</span>
        </span>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    denomLogo: {
      type: String,
      default: () => '/arch-logo.svg',
    },
    price: {
      type: String,
      required: false,
    },
    tokenId: {
      type: Number,
      required: true,
    },
    collectionAddress: {
      type: String,
      required: true,
    },
    openMetadata: {
      type: Function,
    },
    metadata:{
      type: Object as PropType<any>
    },
    marketplace: {
      type: Boolean,
      default: () => true,
    }
  },
  emits: ['openMetadata'],
};
</script>
