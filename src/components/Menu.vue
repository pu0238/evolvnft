<template>
  <div>
    <div
      class="w-full float-left lg:drop-shadow-md bg-white px-6 py-4 rounded-full mt-6"
    >
      <Logo textColor="black" class="float-left" />
      <div class="hidden lg:inline justify-between">
        <NavBar
          class="float-left my-2"
          :navItems="leftNavItems"
          textColor="black"
        />
        <Button
          :isDisabled="false"
          :isFilled="true"
          :content="isWalletConnected ? walletSignerAddress ? walletSignerAddress.slice(0, 10) + '...' + walletSignerAddress.slice(-2) :'disconnect' : 'connect'"
          :isComingSoon="false"
          class="float-right"
          @click="sharedConnect"
        />
        <NavBar
          class="float-right my-2 mr-4"
          :navItems="rightNavItems"
          textColor="black"
        />
      </div>
      <a
        class="float-right lg:hidden pt-3 select-none cursor-pointer"
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
import { computed, PropType, reactive } from 'vue';
import NavBar from './NavBar.vue';
import Logo from './Logo.vue';
import Button from './Button.vue';
import { useStore } from '@nanostores/vue';
import { isMenuOpen } from '../state/menuState';
import { isWallet, sharedConnect } from '../utils/wallet';
import { isWalletConnected, walletSignerAddress } from '../state/walletState';

export default {
  components: { NavBar, Logo, Button },
  methods: {
    sharedConnect,
    toogleMenu() {
      isMenuOpen.set(!this.isMenuOpenValue);
    },
  },
  props: {
    leftNavItems: {
      type: Array as PropType<
        {
          isComingSoon: boolean;
          content: string;
          href: string | undefined;
          isWalletStricted: boolean;
          targetBlank: boolean | undefined;
        }[]
      >,
      default: () => [
        { isComingSoon: false, content: 'solution' },
        { isComingSoon: false, content: 'use cases' },
        { isComingSoon: true, content: 'ecosystem' },
        { isComingSoon: false, content: 'community' },
      ],
      required: true,
    },
    rightNavItems: {
      type: Array as PropType<
        {
          isComingSoon: boolean;
          content: string;
          href: string | undefined;
          isWalletStricted: boolean;
          targetBlank: boolean | undefined;
        }[]
      >,
      default: () => [
        { isComingSoon: false, content: 'solution' },
        { isComingSoon: false, content: 'use cases' },
        { isComingSoon: true, content: 'ecosystem' },
        { isComingSoon: false, content: 'community' },
      ],
      required: true,
    },
  },
  setup(props) {
    isWallet();
    const $collectionDescription = useStore(isWalletConnected);
    const $isMenuOpen = useStore(isMenuOpen);
    const $walletSignerAddress = useStore(walletSignerAddress)

    props = reactive(props);
    return {
      isMenuOpenValue: computed(() => $isMenuOpen.value),
      isWalletConnected: computed(() => $collectionDescription.value),
      walletSignerAddress: computed(() => $walletSignerAddress.value),
    };
  },
};
</script>
