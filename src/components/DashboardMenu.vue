<template>
  <div class="border-r-2 border-zink-300 w-fit pr-8 py-4 float-left flex-none">
    <h4 class="font-cal text-2xl">for users</h4>
    <ul>
      <li
        v-for="item in forUser"
        class="flex items-center ml-4 py-1 ease-out duration-300 border-b-2 border-transparent relative font-josefin font-semibold"
        @click="setLocationHash(item.name, item.disabled)"
        :class="{
          'hover:border-indigo-700 ': !item.disabled,
        }"
      >
        <img :src="item.img" class="mr-2" />
        <p
          class="text-lg"
          :class="{
            'text-zinc-400': item.disabled,
            'text-black': !item.disabled,
          }"
        >
          {{ item.name }}
        </p>
        <span
          v-if="item.disabled"
          class="absolute font-josefin right-0 top-1/2 m-1 text-xs text-zinc-400"
        >
          soon!
        </span>
      </li>
    </ul>
    <h4 class="font-cal text-2xl">for creators</h4>
    <ul>
      <li
        v-for="item in forCreator"
        class="flex items-center ml-4 py-1 ease-out duration-300 border-b-2 border-transparent relative font-josefin font-semibold"
        @click="setLocationHash(item.name, item.disabled)"
        :class="{
          'hover:border-indigo-700 ': !item.disabled,
        }"
      >
        <img :src="item.img" class="mr-2" />
        <p
          class="text-lg"
          :class="{
            'text-zinc-400': item.disabled,
            'text-black': !item.disabled,
          }"
        >
          {{ item.name }}
        </p>
        <span
          v-if="item.disabled"
          class="absolute font-josefin right-0 top-1/2 m-1 text-xs text-zinc-400"
        >
          soon!
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { useBrowserLocation } from '@vueuse/core';
import { openIfConnected } from '../utils/wallet';

export default {
  data() {
    return {
      forUser: [
        {
          name: 'dashboard',
          img: '/icons/dashboard/dashboard.svg',
          walletStricted: true,
        },
        {
          name: 'my NFTs',
          img: '/icons/dashboard/nfts.svg',
          walletStricted: true,
          disabled: false,
        },
        {
          name: 'market',
          img: '/icons/dashboard/marketplace.svg',
          disabled: true,
          walletStricted: true,
        },
        {
          name: 'launchpad',
          img: '/icons/dashboard/launchpad.svg',
          walletStricted: true,
          disabled: true,
        },
        {
          name: 'leaderboard',
          img: '/icons/dashboard/liderboard.svg',
          disabled: true,
          walletStricted: true,
        },
      ],
      forCreator: [
        {
          name: 'my collections',
          img: '/icons/dashboard/collections.svg',
          walletStricted: true,
        },
        { name: 'docs', img: '/icons/dashboard/docs.svg', disabled: true },
      ],
    };
  },
  methods: {
    locationHash(): string | undefined {
      if (window.location.hash !== '' && window.location.hash !== '#')
        return location.hash;
    },
    setLocationHash(hash: string, disabled?: boolean) {
      if (!disabled) location.hash = hash;
    },
    isLocationHash(hash: string) {
      location.hash === '#' + hash;
    },
    openIfWalletIsConnected(isStricted?: boolean, disabled?: boolean) {
      if (isStricted && disabled) {
        return openIfConnected();
      }
    },
  },
  setup() {
    const location = useBrowserLocation();
    return { location };
  },
};
</script>
