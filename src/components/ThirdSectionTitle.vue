<template>
  <h2
    class="text-4xl md:text-5xl xl:text-6xl font-cal"
    id="useCases"
    :class="{
      'text-black': textColor === 'black',
      'text-white': textColor === 'white',
    }"
  >
    build new amazing solutions while maintaining flexibility!
  </h2>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  props: {
    textColor: {
      type: String,
      default: "black",
      required: false,
      validator: (color: string) => ["white", "black"].includes(color),
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
