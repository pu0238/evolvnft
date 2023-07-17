<template>
  <div
    class="border float-left p-6 lg:p-10 py-5 rounded-[2rem] w-[16rem] lg:w-80"
    :class="{
      'bg-white border-white': bgColor === 'white',
      'bg-black border-black': bgColor === 'black',
    }"
  >
    <div class="text-center">
      <img
        alt="Collection image"
        class="w-32 lg:w-40 mx-auto"
        :src="collectionImg"
        draggable="false"
      />
      <h3
        class="font-cal text-xl lg:text-2xl mt-2 mb-1"
        :class="{
          'text-black': bgColor === 'white',
          'text-white': bgColor === 'black',
        }"
      >
        {{ collectionTitle }}
      </h3>
      <p
        class="font-josefin"
        :class="{
          'text-zinc-400': bgColor === 'white',
          'text-zinc-200': bgColor === 'black',
        }"
      >
        {{ collectionSymbol }}
      </p>
    </div>
    <div class="mt-2">
      <h4
        class="font-cal text-md lg:text-lg lg:mb-1"
        :class="{
          'text-black': bgColor === 'white',
          'text-white': bgColor === 'black',
        }"
      >
        Description
      </h4>
      <p
        class="font-josefin mb-1 lg:mb-2 text-sm lg:text-base"
        :class="{
          'text-zinc-400': bgColor === 'white',
          'text-zinc-200': bgColor === 'black',
        }"
      >
        {{ collectionDescription }}
      </p>
      <div v-if="rewardsPercentageFee" class="mt-4">
        <h4
          class="font-cal text-md lg:text-lg lg:mb-1"
          :class="{
            'text-black': bgColor === 'white',
            'text-white': bgColor === 'black',
          }"
        >
          Rewards Percentage
        </h4>
        <p
          class="font-josefin lg:mb-1"
          :class="{
            'text-zinc-400': bgColor === 'white',
            'text-zinc-200': bgColor === 'black',
          }"
        >
          {{ rewardsPercentageFee / 100 }}%
        </p>
        <h4
          class="font-cal text-md lg:text-lg lg:mb-1"
          :class="{
            'text-black': bgColor === 'white',
            'text-white': bgColor === 'black',
          }"
        >
          Rewards
        </h4>
        <p
          v-for="(reward, denom) in accumulatedRewards"
          class="font-josefin"
          :class="{
            'text-zinc-400': bgColor === 'white',
            'text-zinc-200': bgColor === 'black',
          }"
        >
          {{ aarchToArch(reward) }} {{ denom.slice(1) }}
        </p>
      </div>
      <h4
        class="font-cal text-md lg:text-lg mt-4 lg:mt-8 lg:mb-1"
        :class="{
          'text-black': bgColor === 'white',
          'text-white': bgColor === 'black',
        }"
      >
        Medifires
      </h4>
      <p
        class="font-josefin lg:mb-2"
        :class="{
          'text-zinc-400': bgColor === 'white',
          'text-zinc-200': bgColor === 'black',
        }"
      >
        none
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { aarchToArch } from '../utils/arch';

export default {
  methods: {
    aarchToArch,
  },
  props: {
    rewardsPercentageFee: {
      type: Number,
      required: false,
    },
    accumulatedRewards: {
      type: Object,
      required: false,
    },
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
    collectionDescription: {
      type: String,
      default:
        'this is example description of your digital asset. it should be short and clear.',
      required: false,
    },
    bgColor: {
      type: String,
      default: () => 'white',
      required: false,
      validator: (color: string) => ['white', 'black'].includes(color),
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
