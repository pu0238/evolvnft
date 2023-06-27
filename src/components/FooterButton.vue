<template>
  <a :href="href" target="_blank">
    <button
      class="border-b-2 border-zink-300 px-2 flex items-center py-2 text-xl font-josefin w-full"
      :class="{
        'text-zinc-400': isDisabled,
        'hover:border-indigo-700 ease-out duration-300': !isDisabled,
      }"
    >
      <SvgTwitter
        v-if="content === 'twitter'"
        draggable="false"
        :class="{
          'fill-zinc-400': isDisabled,
          'fill-black': !isDisabled,
        }"
      />
      <SvgDiscord
        v-else-if="content === 'discord'"
        draggable="false"
        :class="{
          'fill-zinc-400': isDisabled,
          'fill-black': !isDisabled,
        }"
      />
      <SvgTelegram
        v-else-if="content === 'telegram'"
        draggable="false"
        :class="{
          'fill-zinc-400': isDisabled,
          'fill-black': !isDisabled,
        }"
      />
      <span class="mx-2 flex-auto text-left">
        <span class="float-left relative -z-10"
          >{{ content }}
          <span
            v-if="isDisabled"
            class="absolute -ml-4 top-1/2 m-1 text-xs border-zinc-400"
          >
            soon!</span
          ></span
        ></span
      >
      <span class="flex-initial">
        <svg
          width="16"
          height="13"
          viewBox="0 0 16 13"
          xmlns="http://www.w3.org/2000/svg"
          :class="{
            'fill-zinc-400': isDisabled,
            'fill-black': !isDisabled,
          }"
        >
          <path
            d="M16 6.50427C16 6.27748 15.949 6.05102 15.8483 5.84547C15.8406 5.82699 15.8309 5.8097 15.8213 5.79217C15.8197 5.7893 15.8182 5.78778 15.8166 5.78508C15.8058 5.76552 15.7937 5.74585 15.782 5.72594C15.7712 5.70687 15.7591 5.68909 15.7469 5.67096C15.7464 5.67012 15.7462 5.66945 15.7454 5.6681C15.7068 5.61157 15.6649 5.55648 15.6178 5.50498C15.6021 5.48781 15.5854 5.47049 15.5692 5.4543L10.9502 0.412121C10.4468 -0.137374 9.63667 -0.137374 9.1333 0.412121C8.62993 0.961615 8.62993 1.8469 9.1333 2.3964L11.6192 5.11007L1.34594 5.11007C0.600348 5.11008 4.74332e-05 5.73205 6.69323e-07 6.5052C6.35525e-07 7.27842 0.600348 7.90127 1.34594 7.90125L11.6048 7.90126L9.12849 10.6045C8.62512 11.154 8.62512 12.0384 9.12849 12.5879C9.63186 13.1374 10.4428 13.1374 10.9462 12.5879L15.5196 7.59538L15.5227 7.59218C15.5566 7.56236 15.5898 7.53101 15.6211 7.49666C15.8728 7.22191 16 6.86284 16 6.50427Z"
          />
        </svg>
      </span></button
  ></a>
</template>

<script lang="ts">
import SvgTwitter from './SvgTwitter.vue';
import SvgDiscord from './SvgDiscord.vue';
import SvgTelegram from './SvgTelegram.vue';
import { reactive } from 'vue';

export default {
  components: {
    SvgTwitter,
    SvgDiscord,
    SvgTelegram,
  },
  props: {
    href: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      default: () => 'twitter',
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: () => false,
      required: false,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
