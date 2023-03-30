<template>
  <h2
    class="text-4xl md:text-6xl font-cal text-center"
    :class="{
      'text-black': textColor === 'black',
      'text-white': textColor === 'white',
    }"
    id="solution"
  >
    discover <span class="text-indigo-500">new possibilities</span> thanks to
    <span class="text-indigo-500">evolving metadata</span>
  </h2>
</template>

<script lang="ts">
import HeaderTitle from "./HeaderTitle.vue";
import HeaderSubtitle from "./HeaderSubtitle.vue";
import Button from "./Button.vue";
import { reactive } from "vue";

export default {
  components: { HeaderTitle, HeaderSubtitle, Button },

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
