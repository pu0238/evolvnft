<template>
  <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
    ⌛upcoming mints
  </h1>
  <div class="grid 2xl:grid-cols-2"></div>
  <div class="flex">
    <div class="px-4">
      <UpcomingMintBox class="bg-black h-[100px] w-[100px] rounded-3xl flex" />
    </div>
    <div class="mx-4">
      <UpcomingMintBox class="bg-black h-[100px] w-[100px] rounded-3xl flex" />
    </div>
    <div class="px-4">
      <UpcomingMintBox class="bg-black h-[100px] w-[100px] rounded-3xl flex" />
    </div>
  </div>
</template>

<script lang="ts">
import UpcomingMintBox from './UpcomingMintBox.vue';
export default {
  components: {
    UpcomingMintBox,
  },
};
</script>
