<template>
  <div class="grid grid-cols-2 ">
    <div class="py-2 -mt-4 -ml-4 px-4">
    <p class="font-josefin text-sm text-zinc-500">{{ parameterTitle }}</p>
    
  </div> 
  <div>
    <p
      class="-m-2 px-2 font-josefin font-medium text-lg+"
      :class="{
        'text-black': subtitleColor === 'black',
        'text-white': subtitleColor === 'white',
        'text-right': toRight,
      }"
    >
      {{ parameterSubtitle }}
    </p>

  </div>

    
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';

export default {
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
