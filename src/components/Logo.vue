<template>
  <a href="/">
    <div
      class="font-cal place-content-center py-1"
      :class="{
        'text-white': textColor === 'white',
        'text-black': textColor === 'black',
      }"
    >
      <img
        draggable="false"
        src="/evolvnft-logo.svg"
        alt="EvolvNFT logo"
        class="h-8"
      /></div
  ></a>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  props: {
    textColor: {
      type: String,
      default: () => 'black',
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
