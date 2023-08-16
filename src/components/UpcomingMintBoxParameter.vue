<template>
  <div class="grid grid-cols-2 py-2 -mt-4 -ml-4 px-4">
    <p class="font-josefin text-sm text-zinc-500">{{ parameterTitle }}</p>
    <div
      v-if="parameterTitle === 'project links'"
      class="flex w-full items-center justify-end"
    >
      <a v-if="twitterUrl" :href="twitterUrl" target="_blank" class="mx-1">
        <SvgTwitter
          class="fill-white ease-out duration-300 hover:fill-indigo-500"
          draggable="false"
        />
      </a>

      <a v-if="discordUrl" :href="discordUrl" target="_blank" class="mx-1">
        <SvgDiscord
          class="fill-white ease-out duration-300 hover:fill-indigo-500"
          draggable="false"
        />
      </a>

      <a v-if="projectUrl" :href="projectUrl" target="_blank" class="mx-1">
        <SvgWeb class="fill-white ease-out duration-300 hover:fill-indigo-500" draggable="false" />
      </a>
    </div>
    <p
      v-else
      class="-m-2 px-2 font-josefin font-medium text-lg text-right pt-1"
      :class="{
        'text-black': subtitleColor === 'black',
        'text-white': subtitleColor === 'white',
      }"
    >
      {{ parameterSubtitle }}
    </p>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import Button from './Button.vue';
import SvgTwitter from './SvgTwitter.vue';
import SvgDiscord from './SvgDiscord.vue';
import SvgWeb from './SvgWeb.vue';

export default {
  components: {
    Button,
    SvgTwitter,
    SvgDiscord,
    SvgWeb,
  },
  props: {
    parameterTitle: {
      type: String,
      default: () => '',
      required: true,
    },
    parameterSubtitle: {
      type: String,
      default: () => undefined,
      required: false,
    },
    subtitleColor: {
      type: String as PropType<'black' | 'white'>,
      default: () => 'black',
      required: false,
      validator: (color: string) => ['black', 'white'].includes(color),
    },
    discordUrl: {
      type: String,
      default: () => undefined,
      required: false,
    },
    twitterUrl: {
      type: String,
      default: () => undefined,
      required: false,
    },
    projectUrl: {
      type: String,
      default: () => undefined,
      required: false,
    },
  },
};
</script>
