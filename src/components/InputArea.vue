<template>
  <div>
    <span class="text-xl md:text-2xl font-cal text-white">{{ heading }}</span>
    <input
      class="w-full text-md md:text-lg lg:text-xl font-josefin py-1 px-2 border-b-2 border-zink-300 bg-transparent text-zinc-300 outline-none focus:border-indigo-500 ease-out duration-300"
      type="text"
      :placeholder="placeholder"
      @input="changeInput"
    />
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";

export default {
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "Placeholder",
      required: false,
    },
    heading: {
      type: String,
      default: "Input:",
      required: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ['update:modelValue'],
  methods: {
    changeInput(event: any) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
