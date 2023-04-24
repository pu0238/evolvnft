<template>
  <a
    :href="isWalletStricted ? undefined : href"
    @click="openIfWalletIsConnected()"
  >
    <button
      class="px-4 sm:px-5 py-2 text-sm sm:text-base align-middle font-semibold flex items-center border-4 rounded-full font-josefin disabled:text-zinc-200 relative group"
      :class="{
        'bg-indigo-500 border-indigo-500 text-white disabled:bg-indigo-700 disabled:border-indigo-700 disabled:text-zinc-300 hover:border-indigo-700 hover:bg-indigo-700':
          isFilled && color === 'indigo',
        'bg-transparent border-indigo-500 text-indigo-500 disabled:text-indigo-700 disabled:border-indigo-700 hover:text-indigo-700 hover:border-indigo-700':
          !isFilled && color === 'indigo',
        'bg-black border-black text-white disabled:bg-zinc-700 disabled:border-zinc-700 disabled:text-zinc-400 hover:text-black hover:bg-transparent hover:border-black':
          isFilled && color === 'black',
        'bg-transparent border-black text-black disabled:border-zinc-400 disabled:text-zinc-400 ':
          !isFilled && color === 'black',
        'ease-out duration-300': !isDisabled,
        'bg-transparent border-white text-white disabled:border-zinc-300 disabled:text-zinc-300 hover:text-indigo-500 hover:border-indigo-500':
          !isFilled && color === 'white',
      }"
      type="button"
      :disabled="isDisabled"
    >
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mr-3 ease-out duration-300 fill-white"
        :class="{
          hidden: arrow !== 'left',
          'group-hover:fill-indigo-500': color !== 'black',
          'group-hover:fill-black': color === 'black',
        }"
      >
        <path
          d="M2.62441e-07 6.00395C2.5329e-07 5.79459 0.0446136 5.58556 0.132744 5.39582C0.139502 5.37876 0.148 5.3628 0.15638 5.34661C0.157732 5.34397 0.159112 5.34257 0.160464 5.34008C0.169926 5.32202 0.180469 5.30387 0.190742 5.28548C0.200204 5.26788 0.210754 5.25147 0.221432 5.23474C0.221932 5.23395 0.22209 5.23334 0.222752 5.23209C0.256544 5.17991 0.29319 5.12906 0.334417 5.08152C0.348204 5.06567 0.362794 5.04968 0.376987 5.03474L4.41857 0.380419C4.85902 -0.126807 5.56791 -0.126807 6.00836 0.380419C6.44881 0.887645 6.44881 1.70483 6.00836 2.21206L3.83323 4.71699L12.8223 4.71699C13.4747 4.717 14 5.29113 14 6.0048C14 6.71854 13.4747 7.29348 12.8223 7.29346L3.84581 7.29347L6.01257 9.78875C6.45302 10.296 6.45302 11.1123 6.01257 11.6196C5.57212 12.1268 4.86253 12.1268 4.42208 11.6196L0.420341 7.01112L0.417619 7.00816C0.388017 6.98064 0.358969 6.9517 0.331529 6.91999C0.111298 6.66638 -1.324e-05 6.33493 2.62441e-07 6.00395Z"
        />
      </svg>

      {{ content }}
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="ml-3"
        :class="{ hidden: arrow !== 'right' }"
      >
        <path
          d="M14 6.00395C14 5.79459 13.9554 5.58556 13.8673 5.39582C13.8605 5.37876 13.852 5.3628 13.8436 5.34661C13.8423 5.34397 13.8409 5.34257 13.8395 5.34008C13.8301 5.32202 13.8195 5.30387 13.8093 5.28548C13.7998 5.26788 13.7892 5.25147 13.7786 5.23474C13.7781 5.23395 13.7779 5.23334 13.7772 5.23209C13.7435 5.17991 13.7068 5.12906 13.6656 5.08152C13.6518 5.06567 13.6372 5.04968 13.623 5.03474L9.58143 0.380419C9.14098 -0.126807 8.43209 -0.126807 7.99164 0.380419C7.55119 0.887645 7.55119 1.70483 7.99164 2.21206L10.1668 4.71699L1.1777 4.71699C0.525305 4.717 4.13858e-05 5.29113 8.03868e-07 6.0048C7.72669e-07 6.71854 0.525304 7.29348 1.1777 7.29346L10.1542 7.29347L7.98743 9.78875C7.54698 10.296 7.54698 11.1123 7.98743 11.6196C8.42788 12.1268 9.13747 12.1268 9.57792 11.6196L13.5797 7.01112L13.5824 7.00816C13.612 6.98064 13.641 6.9517 13.6685 6.91999C13.8887 6.66638 14 6.33493 14 6.00395Z"
          fill="white"
        />
      </svg>
      <span
        v-if="isComingSoon"
        class="absolute bottom-0 top-1/2 right-2 m-1 text-xs border-zinc-400"
      >
        soon!</span
      >
    </button>
  </a>
</template>

<script lang="ts">
import { PropType, reactive } from "vue";
import { openIfConnected } from "../utils/wallet";

export default {
  methods: {
    openIfWalletIsConnected() {
      if (this.href && this.isWalletStricted) {
        openIfConnected(this.href);
      }
    },
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    isFilled: {
      type: Boolean,
      default: true,
      required: false,
    },
    content: {
      type: String,
      default: "Click me!",
      required: true,
    },
    color: {
      type: String as PropType<"indigo" | "black" | "white">,
      default: "indigo",
      required: false,
      validator: (color: string) =>
        ["indigo", "black", "white"].includes(color),
    },
    isComingSoon: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: String as PropType<"left" | "right">,
      default: "",
      required: false,
    },
    href: {
      type: String,
      default: undefined,
      required: false,
    },
    isWalletStricted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
