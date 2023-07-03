<template>
  <div class="bg-black border border-black float-left p-1 rounded-xl">
    <div class="text-center">
      <img
        class="w-24 mx-auto"
        :src="collectionImg"
        alt="Collection image"
        draggable="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    collectionImg: {
      type: String,
      default: () => '/evolvnft-collection-logo.svg',
      required: false,
    },
  },
};
</script>
