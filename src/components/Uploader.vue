<template>
  <div>
    <span class="text-xl md:text-2xl font-cal mb-4 text-white">{{ heading }}</span>
    <div
      v-bind="getRootProps()"
      class="font-josefin text-zinc-300 border-dashed border-2 border-indigo-500 h-32 text-center flex justify-center items-center"
    >
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">frop image here ...</p>
      <p v-else>drag here collection <br />image</p>
    </div>
    <button @click="open">open</button>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useDropzone } from "vue3-dropzone";

export default {
  props: {
    heading: {
      type: String,
      default: "Input:",
      required: false,
    },
  },
  setup(props) {
    props = reactive(props);
    const onDrop = (acceptFiles: any[], rejectReasons: any[]) => {
      console.log(acceptFiles);
      console.log(acceptFiles[0]);
    };
    const { getRootProps, getInputProps, isDragActive, open, ...rest } =
      useDropzone({
        onDrop,
      });
    return {
      getRootProps,
      getInputProps,
      isDragActive,
      open,
      ...rest,
    };
  },
};
</script>
