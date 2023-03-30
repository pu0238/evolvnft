<template>
  <button
    class="px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold border-4 rounded-full font-josefin disabled:text-zinc-200 relative ease-out duration-300"
    :class="{
      'bg-indigo-500 border-indigo-500 text-white disabled:bg-indigo-700 disabled:border-indigo-700 disabled:text-zinc-300 hover:border-indigo-700 hover:bg-indigo-700':
        isFilled && color === 'indigo',
      'bg-transparent border-indigo-500 text-indigo-500 disabled:text-indigo-700 disabled:border-indigo-700 hover:text-indigo-700 hover:border-indigo-700':
        !isFilled && color === 'indigo',
      'bg-black border-black text-white disabled:bg-zinc-700 disabled:border-zinc-700 disabled:text-zinc-400 hover:bg-zinc-700 hover:border-zinc-700':
        isFilled && color === 'black',
      'bg-transparent border-black text-black disabled:border-zinc-400 disabled:text-zinc-400':
        !isFilled && color === 'black',
      'ease-out duration-300': !isDisabled,
    }"
    type="button"
    :disabled="isDisabled"
  >
    {{ content }}
    <span
      v-if="isComingSoon"
      class="absolute bottom-0 -ml-6 top-1/2 m-1 text-xs border-zinc-400"
    >
      soon!</span
    >
  </button>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {

  props: {
    isDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    isFilled: {
      type: Boolean,
      default: true,
      required: true,
    },
    content: {
      type: String,
      default: "Click me!",
      required: true,
    },
    color: {
      type: String,
      default: "indigo",
      required: false,
      validator: (color: string) => ["indigo", "black"].includes(color),
    },
    isComingSoon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
