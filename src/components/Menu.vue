<template>
  <div>
    <div
      class="w-full float-left md:drop-shadow-md bg-white px-6 py-4 rounded-full mt-6"
    >
      <Logo textColor="black" class="float-left" />
      <div class="hidden md:block">
        <NavBar :navItems="navItems" textColor="black" />
        <Button
          :isDisabled="false"
          :isFilled="true"
          :content="isWalletConnected ? 'disconnect' : 'connect'"
          :isComingSoon="false"
          class="float-right"
          @click="sharedConnect"
        />
      </div>
      <a
        class="float-right md:hidden pt-3 select-none cursor-pointer"
        @click="toogleMenu"
      >
        <svg
          width="22"
          height="16"
          viewBox="0 0 26 20"
          class="stroke-black hover:stroke-indigo-500 ease-out duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 18H24M2 10H24M2 2H24"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType, reactive } from "vue";
import NavBar from "./NavBar.vue";
import Logo from "./Logo.vue";
import Button from "./Button.vue";
import type { Window as KeplrWindow } from "@keplr-wallet/types";
import { useStore } from "@nanostores/vue";
import { isMenuOpen } from "../state/menuState";
import { sharedConnect } from "../utils/wallet";
import { isWalletConnected } from "../state/walletState";

declare global {
  interface Window extends KeplrWindow {}
}

export default {
  components: { NavBar, Logo, Button },
  methods: {
    sharedConnect,
    toogleMenu() {
      isMenuOpen.set(!this.isMenuOpenValue);
      console.log(isMenuOpen.get());
    },
  },
  props: {
    navItems: {
      type: Array as PropType<{ isComingSoon: boolean; content: string }[]>,
      default: () => [
        { isComingSoon: false, content: "solution" },
        { isComingSoon: false, content: "use cases" },
        { isComingSoon: true, content: "ecosystem" },
        { isComingSoon: false, content: "community" },
      ],
      required: true,
    },
  },
  setup(props) {
    const $isMenuOpen = useStore(isMenuOpen);
    const $isWalletConnected = useStore(isWalletConnected);
    props = reactive(props);
    return {
      isMenuOpenValue: computed(() => $isMenuOpen.value),
      isWalletConnected: computed(() => $isWalletConnected.value),
    };
  },
};
</script>
