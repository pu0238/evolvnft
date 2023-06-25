<template>
  <div class="grid py-2 -mt-4 -ml-4 px-4">
    <p class="font-josefin text-sm text-zinc-500">{{ parameterTitle }}</p>
    <p class="-m-2 px-2 text-black font-josefin font-medium text-lg">
      {{ parameterSubtitle }}
    </p>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    parameterTitle: {
      type: String,
      default: () => 'title',
      required: true,
    },
    parameterSubtitle: {
      type: String,
      default: () => 'subtitle',
      required: true,
    },
  },
};
</script>
