<template>
  <p
    class="text-lg md:text-xl 2xl:text-2xl font-josefin"
    :class="{
      'text-zinc-700': textColor === 'black',
      'text-zinc-300': textColor === 'white',
    }"
  >
    {{ content }}
  </p>
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
    content: {
      type: String,
      default:
        'decentralized hub that allows you to easily create, manage and evolve your decentralized assets.',
      required: false,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
