<template>
  <div>
    <div
      class="w-full float-left drop-shadow-md bg-white px-6 py-4 rounded-full"
    >
      <Logo textColor="black" class="float-left" />
      <div class="hidden md:block">
        <NavBar :navItems="navItems" textColor="black" />
        <Button
          :isDisabled="false"
          :isFilled="true"
          content="connect"
          :isComingSoon="false"
          class="float-right"
          @click="connect"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, reactive } from "vue";
import NavBar from "./NavBar.vue";
import Logo from "./Logo.vue";
import Button from "./Button.vue";
import type { ChainInfo, Window as KeplrWindow } from "@keplr-wallet/types";
import { ConstantineInfo } from "../utils/constant";

declare global {
  interface Window extends KeplrWindow {}
}

export default {
  components: { NavBar, Logo, Button },
  methods: {
    connect: async () => {
      const { keplr } = window;
      if (!keplr) {
        alert("You need to install Keplr");
        return;
      }
      await keplr.experimentalSuggestChain(ConstantineInfo);
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
    props = reactive(props);
    return {};
  },
};
</script>
