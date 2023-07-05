<template>
  <div class="w-full h-full">
    <span class="text-xl md:text-xl font-cal mb-4 text-white w-full">{{
      heading
    }}</span>
    <div
      v-bind="getRootProps()"
      class="font-josefin text-zinc-300 border-dashed border-2 w-full h-full border-indigo-500 text-center flex justify-center items-center"
      :class="{
        'h-48 w-48': isSquare
      }"
    >
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">drop file here ...</p>
      <p v-else>{{ dropboxText }} <br/> <span class="text-xs">{{dropboxText2 }}</span></p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, reactive } from 'vue';
import { useDropzone } from 'vue3-dropzone';

export default {
  props: {
    heading: {
      type: String,
      default: () => 'Input:',
      required: false,
    },
    acceptFiles: {
      type: Array,
      required: false,
    },
    acceptedTypes: {
      type: Array as PropType<string[]>,
      default: () => ['image/jpeg', 'image/png', 'image/gif'],
      required: false,
    },
    maxFiles: {
      type: Number,
      required: false,
    },
    dropboxText: {
      type: String,
      default: () => 'drag files here!',
      required: false,
    },
    dropboxText2: {
      type: String,
      default: () => '(max 100kb per file)',
      required: false,
    },
    isSquare: {
      type: Boolean,
      default: () => false,
      required: false,
    }
  },
  emits: ['acceptFiles'],
  setup(props, { emit }) {
    props = reactive(props);
    const onDrop = async (acceptFiles: any[], rejectReasons: any[]) => {
      const filteredAcceptFiles = acceptFiles.filter((file) =>
        props.acceptedTypes.includes(file.type),
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
