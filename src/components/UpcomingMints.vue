<template>
  <div class="grid md:grid-cols-2"></div>
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
