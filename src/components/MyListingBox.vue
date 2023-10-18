<template>
  <div
    class="border-b-2 border-zink-300 flex font-josefin px-2 justify-self-stretch py-1"
  >
    <img
      class="w-20 h-20 bg-black rounded-lg"
      :class="{
        'p-2': tokenImage === 'evolvnft-collection-logo.svg',
      }"
      :src="tokenImage"
    />
    <div class="w-full px-2">
      <div class="flex justify-between items-center">
        <a
          class="flex items-center font-cal text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
          :href="`/marketplace?tokenId=${listing.token_id}#${listing.collection}`"
          target="_blank"
        >
          #{{ listing.token_id }}
        </a>
        <div class="flex items-center font-cal">
          <img draggable="false" :src="denomLogo" class="w-4 mx-1 my-2" />
          <span>{{ aarchToArch(Number(listing.price)) }}</span>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-bottom mt-auto">
          collection
          <a
            class="text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
            :href="`/marketplace#${listing.collection}`"
            target="_blank"
          >
            {{ shortenArchAddress(listing.collection) }}
          </a>
        </div>
        <div class="flex">
          <Button
            content="close listing"
            @click="$emit('cancelOffer', listing.collection, listing.token_id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { aarchToArch, shortenArchAddress } from '../utils/arch';
import { cancelOffer } from '../utils/evolve';
import Button from '../components/Button.vue';
import type { UserListings } from '../utils/types/UserListings';

export default {
  components: { Button },
  emits: ['cancelOffer'],
  props: {
    tokenImage: {
      type: String,
    },
    listing: {
      type: Object as PropType<UserListings>,
      required: true,
    },
    denomLogo: {
      type: String,
      default: () => '/arch-logo.svg',
    },
  },
  methods: {
    shortenArchAddress,
    aarchToArch,
    cancelOffer,
  },
};
</script>
