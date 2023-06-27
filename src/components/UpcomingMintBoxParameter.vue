<template>
  <div class="grid grid-cols-2 py-2 -mt-4 -ml-4 px-4">
    <p class="font-josefin text-sm text-zinc-500">{{ parameterTitle }}</p>
    <p
      class="-m-2 px-2 font-josefin font-medium text-lg text-right pt-1"
      :class="{
        'text-black': subtitleColor === 'black',
        'text-white': subtitleColor === 'white',
      }"
    >
      {{ parameterSubtitle }}
    </p>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import Button from './Button.vue';
export default {
  components: {
    Button,
  },
  props: {
    parameterTitle: {
      type: String,
      default: () => '',
      required: true,
    },
    parameterSubtitle: {
      type: String,
      default: () => '',
      required: true,
    },
    subtitleColor: {
      type: String as PropType<'black' | 'white'>,
      default: () => 'black',
      required: false,
      validator: (color: string) => ['black', 'white'].includes(color),
    },
    toRight: {
      type: Boolean,
      default: () => false,
      required: false,
    },
  },
};
</script>
