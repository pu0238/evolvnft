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
        'cursor-progress': state === 'progress',
        'cursor-not-allowed': state === 'notAllowed',
        'cursor-pointer': state === 'allowed',
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
          'fill-zinc-200 ': isDisabled,
        }"
      >
        <path
          d="M2.62441e-07 6.00395C2.5329e-07 5.79459 0.0446136 5.58556 0.132744 5.39582C0.139502 5.37876 0.148 5.3628 0.15638 5.34661C0.157732 5.34397 0.159112 5.34257 0.160464 5.34008C0.169926 5.32202 0.180469 5.30387 0.190742 5.28548C0.200204 5.26788 0.210754 5.25147 0.221432 5.23474C0.221932 5.23395 0.22209 5.23334 0.222752 5.23209C0.256544 5.17991 0.29319 5.12906 0.334417 5.08152C0.348204 5.06567 0.362794 5.04968 0.376987 5.03474L4.41857 0.380419C4.85902 -0.126807 5.56791 -0.126807 6.00836 0.380419C6.44881 0.887645 6.44881 1.70483 6.00836 2.21206L3.83323 4.71699L12.8223 4.71699C13.4747 4.717 14 5.29113 14 6.0048C14 6.71854 13.4747 7.29348 12.8223 7.29346L3.84581 7.29347L6.01257 9.78875C6.45302 10.296 6.45302 11.1123 6.01257 11.6196C5.57212 12.1268 4.86253 12.1268 4.42208 11.6196L0.420341 7.01112L0.417619 7.00816C0.388017 6.98064 0.358969 6.9517 0.331529 6.91999C0.111298 6.66638 -1.324e-05 6.33493 2.62441e-07 6.00395Z"
        />
      </svg>

      {{ content }}

      <svg
        class="ml-3"
        width="15"
        height="20"
        viewBox="0 0 15 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{
          hidden: !evolv,
          'group-hover:fill-indigo-500': color !== 'black',
          'group-hover:fill-black': color === 'black',
          'fill-zinc-200 ': isDisabled,
        }"
      >
        <path
          d="M9.41725 0C9.25369 0 9.09038 0.0401395 8.94214 0.119432C8.92881 0.125513 8.91635 0.133158 8.9037 0.140698C8.90163 0.141914 8.90054 0.143156 8.89859 0.144372C8.88448 0.152885 8.8703 0.162371 8.85594 0.171614C8.84218 0.180127 8.82936 0.189619 8.81629 0.199227C8.81568 0.199677 8.8152 0.199818 8.81423 0.200414C8.77346 0.230818 8.73373 0.263789 8.69659 0.300881C8.68421 0.313286 8.67172 0.326413 8.66004 0.339183L5.02377 3.97548C4.62749 4.37176 4.62749 5.00956 5.02377 5.40584C5.42005 5.80212 6.05849 5.80212 6.45477 5.40584L8.41179 3.44883V11.5365C8.4118 12.1234 8.86035 12.596 9.41792 12.5961C9.97554 12.5961 10.4247 12.1234 10.4247 11.5365L10.4247 3.46015L12.3742 5.40963C12.7705 5.80591 13.4083 5.80591 13.8046 5.40963C14.2008 5.01335 14.2008 4.37491 13.8046 3.97863L10.2041 0.378189L10.2018 0.37574C10.1803 0.349106 10.1577 0.322971 10.1329 0.298283C9.93479 0.100137 9.67584 -1.21614e-05 9.41725 0Z"
          fill="white"
        />
        <path
          d="M3.10225 6.59277C2.99408 6.59277 2.88607 6.6193 2.78803 6.67171C2.77928 6.67536 2.77097 6.68022 2.7626 6.68582C2.76127 6.68662 2.76054 6.68701 2.7592 6.68823C2.74984 6.69431 2.74049 6.70039 2.73099 6.70623C2.72187 6.71231 2.71342 6.71841 2.70478 6.72449C2.70437 6.72478 2.70405 6.72492 2.70344 6.72531C2.67647 6.74537 2.65019 6.76726 2.62564 6.7917C2.61749 6.80022 2.60919 6.80859 2.60148 6.81698L0.196565 9.22191C-0.0655216 9.484 -0.0655216 9.90582 0.196565 10.1679C0.45865 10.43 0.880894 10.43 1.14298 10.1679L2.43729 8.8736V14.2225C2.4373 14.6107 2.73395 14.9233 3.10271 14.9233C3.4715 14.9233 3.76858 14.6107 3.76857 14.2225L3.76857 8.8811L5.0579 10.1704C5.31998 10.4325 5.7418 10.4325 6.00389 10.1704C6.26597 9.90834 6.26598 9.48608 6.0039 9.22399L3.62268 6.84277L3.6211 6.84158C3.60688 6.82395 3.59193 6.80666 3.57554 6.79037C3.4445 6.65933 3.27327 6.59276 3.10225 6.59277Z"
          fill="white"
        />
        <path
          d="M6.8548 13.3923C6.7763 13.3923 6.69791 13.4115 6.62677 13.4496C6.62044 13.452 6.61439 13.4557 6.60831 13.4605C6.60734 13.4611 6.60685 13.4614 6.60588 13.463C6.59907 13.4679 6.5923 13.4727 6.58541 13.4761C6.57884 13.481 6.57265 13.4859 6.56637 13.4894C6.56682 13.4891 6.56608 13.4896 6.56637 13.4894C6.54681 13.504 6.52677 13.5204 6.50895 13.5381C6.50299 13.5442 6.49703 13.5504 6.49141 13.5565L4.74616 15.3017C4.55597 15.4919 4.55597 15.7981 4.74616 15.9883C4.93636 16.1784 5.24278 16.1784 5.43298 15.9883L6.37226 15.049V18.9307C6.37227 19.2124 6.58755 19.4393 6.85516 19.4393C7.12279 19.4393 7.33839 19.2124 7.33838 18.9307V15.0544L8.27405 15.9901C8.46424 16.1803 8.77036 16.1803 8.96056 15.9901C9.15076 15.7999 9.15076 15.4935 8.96056 15.3033L7.23251 13.5752L7.23136 13.5743C7.22102 13.5614 7.21018 13.549 7.1983 13.5371C7.1032 13.442 6.97886 13.3944 6.85475 13.3944L6.8548 13.3923Z"
          fill="white"
        />
      </svg>

      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="ml-3"
        :class="{
          hidden: arrow !== 'right',
          'group-hover:fill-indigo-500': color !== 'black',
          'group-hover:fill-black': color === 'black',
          'fill-zinc-200 ': isDisabled,
        }"
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
    state: {
      type: String as PropType<"progress" | "notAllowed" | "allowed">,
      default: "allowed",
      required: false,
      validator: (s: string) =>
        ["progress", "notAllowed", "allowed"].includes(s),
    },
    evolv: {
      type: Boolean,
      default: false,
      required: false,
    },
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
