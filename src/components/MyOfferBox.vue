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
          :href="`/marketplace?tokenId=${offer.tokenId}#${offer.collection}`"
          target="_blank"
        >
          #{{ offer.tokenId }}
        </a>
        <div class="flex items-center font-cal">
          <img draggable="false" :src="denomLogo" class="w-4 mx-1 my-2" />
          <span>{{ aarchToArch(Number(offer.offer.amount)) }}</span>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-bottom mt-auto">
          collection
          <a
            class="text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
            :href="`/marketplace#${offer.collection}`"
            target="_blank"
          >
            {{ shortenArchAddress(offer.collection) }}
          </a>
        </div>
        <div class="flex">
          <Button
            content="cancel"
            @click="$emit('cancelOffer', offer.collection, offer.tokenId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { UserOffers } from '../utils/types/UserOffers';
import { aarchToArch, shortenArchAddress } from '../utils/arch';
import { cancelOffer } from '../utils/evolve';
import Button from '../components/Button.vue';

export default {
  components: { Button },
  emits: ['cancelOffer'],
  props: {
    tokenImage: {
      type: String,
    },
    offer: {
      type: Object as PropType<UserOffers>,
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
