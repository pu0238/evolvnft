<template>
  <div>
    <span class="text-xl md:text-2xl font-cal mb-4 text-white">{{
      heading
    }}</span>
    <div
      v-bind="getRootProps()"
      class="font-josefin text-zinc-300 border-dashed border-2 border-indigo-500 h-32 text-center flex justify-center items-center"
    >
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">drop file here ...</p>
      <p v-else>drag files here!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, reactive } from "vue";
import { useDropzone } from "vue3-dropzone";

export default {
  props: {
    heading: {
      type: String,
      default: () => "Input:",
      required: false,
    },
    acceptFiles: {
      type: Array,
      required: false,
    },
    acceptedTypes: {
      type: Array as PropType<string[]>,
      default: () => ["image/jpeg", "image/png", "image/gif"],
      required: false,
    },
    maxFiles: {
      type: Number,
      required: false,
    },
  },
  emits: ['acceptFiles'],
  setup(props, { emit }) {
    props = reactive(props);
    const onDrop = async (acceptFiles: any[], rejectReasons: any[]) => {
      const filteredAcceptFiles = acceptFiles.filter((file) =>
        props.acceptedTypes.includes(file.type)
      );
      emit('acceptFiles', filteredAcceptFiles);
    };
    const { getRootProps, getInputProps, isDragActive, open, ...rest } =
      useDropzone({
        onDrop,
        maxSize: 100_000,
        maxFiles: props.maxFiles,
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
