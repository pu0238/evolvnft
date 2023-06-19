<template>
  <h1
    class="text-5xl xl:text-6xl 2xl:text-7xl font-cal"
    :class="{
      'text-black': textColor === 'black',
      'text-white': textColor === 'white',
    }"
  >
    <span class="text-indigo-500">create</span>
    and
    <span class="text-indigo-500">evolv</span>
    your assets
  </h1>
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
