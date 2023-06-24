<template></template>
<script lang="ts">
export default {
  props: {
    parameterTitle: {
      type: String,
      default: () => '/title',
      required: true,
    },
    parameterSubtitle: {
      type: String,
      default: () => '/subtitle',
      required: true,
    },
    
  },
};
</script>




