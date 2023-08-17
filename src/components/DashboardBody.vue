<template>
  <DashboardMenu client:only />
  <DashboardContainer client:only>
    <div v-if="location.hash === '#dashboard' || location.hash === ''">
      <h1 class="text-5xl xl:text-6xl font-cal text-black w-full">dashboard</h1>
      <p class="text-md md:text-lg lg:text-xl font-josefin text-zinc-700">
        Here you will find statistics and information about your wallet.
      </p>
      <UserStats />
    </div>
    <div v-if="location.hash === '#my%20NFTs'">
      <h1 class="text-5xl xl:text-6xl font-cal text-black">my NFTs</h1>
      <p class="text-md md:text-lg lg:text-xl font-josefin text-zinc-700">
        In this tab you can preview and manage your NFT collections.
      </p>
      <MyNFTs />
    </div>
    <div v-if="location.hash === '#my%20collections'">
      <h1 class="text-5xl xl:text-6xl font-cal text-black">my collections</h1>
      <p class="text-md md:text-lg lg:text-xl font-josefin text-zinc-700">
        In this tab you can preview and manage your NFT collections.
      </p>
      <MyCollections />
    </div>
    <div v-if="location.hash === '#launchpad'">
      <h1 class="text-5xl xl:text-6xl font-cal text-black">launchpad</h1>
    </div>
    <div v-if="location.hash === '#market'">
      <h1 class="text-5xl xl:text-6xl font-cal text-black">market</h1>
      <p class="text-md md:text-lg lg:text-xl font-josefin text-zinc-700">
        In this tab you can see your offers and listings.
      </p>
      <MyMarket />
    </div>
  </DashboardContainer>
</template>

<script lang="ts">
import DashboardContainer from '../components/DashboardContainer.vue';
import DashboardMenu from '../components/DashboardMenu.vue';
import MyCollections from '../components/MyCollections.vue';
import UserStats from '../components/UserStats.vue';
import MyNFTs from '../components/MyNFTs.vue'
import MyMarket from '../components/MyMarket.vue'

// @ts-ignore
import { useBrowserLocation } from '@vueuse/core';
import { isWallet } from '../utils/wallet';
export default {
  components: { DashboardContainer, DashboardMenu, MyCollections, UserStats, MyNFTs, MyMarket },
  setup() {
    isWallet();
    const location = useBrowserLocation();
    return { location };
  },
};
</script>
