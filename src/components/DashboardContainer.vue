<template>
  <div class="float-left flex-1 px-8">
    <slot />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { useBrowserLocation } from '@vueuse/core';

export default {
  setup() {
    const location = useBrowserLocation();
    return { location };
  },
};
</script>
