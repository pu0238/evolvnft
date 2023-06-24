<template>
  <h2
    class="text-4xl md:text-5xl 2xl:text-6xl font-cal"
    :class="{
      'text-black': textColor === 'black',
      'text-white': textColor === 'white',
    }"
  >
    <span class="text-indigo-500">create</span> a unique
    <span class="text-indigo-500">evolving NFT</span> collection
  </h2>
</template>

<script lang="ts">
import { reactive } from 'vue';

export default {
  props: {
    textColor: {
      type: String,
      default: () => 'black',
      required: true,
      validator: (color: string) => ['white', 'black'].includes(color),
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
