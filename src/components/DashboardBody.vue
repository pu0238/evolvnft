<template>
  <DashboardMenu client:only />
  <DashboardContainer client:only>
    <div v-if="location.hash === '#dashboard' || location.hash === ''">
      <h1 class="text-5xl xl:text-6xl font-cal text-black w-full">dashboard</h1>
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
  </DashboardContainer>
</template>

<script lang="ts">
import DashboardContainer from '../components/DashboardContainer.vue';
import DashboardMenu from '../components/DashboardMenu.vue';
import MyCollections from '../components/MyCollections.vue';
// @ts-ignore
import { useBrowserLocation } from '@vueuse/core';
export default {
  components: { DashboardContainer, DashboardMenu, MyCollections },
  setup() {
    const location = useBrowserLocation();
    return { location };
  },
};
</script>
