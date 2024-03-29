<template>
  <div class="fixed z-50  block w-full lg:hidden top-0 left-0">
    <div
      v-if="isMenuOpenValue"
      class="fixed top-0 w-full h-full bg-white px-6 py-4"
    >
      <div class="mx-10">
        <div class="mt-14 grid container text-center mx-auto cursor-pointer">
          <div class="p-4" @click="toogleMenu">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              class="float-right fill-black hover:fill-indigo-500 ease-out duration-200"
            >
              <path
                d="M19.557 0.458161C19.4167 0.317531 19.25 0.20596 19.0665 0.129836C18.8829 0.0537112 18.6862 0.0145271 18.4875 0.0145271C18.2889 0.0145271 18.0921 0.0537112 17.9086 0.129836C17.7251 0.20596 17.5584 0.317531 17.4181 0.458161L10 7.86105L2.58194 0.442991C2.4415 0.302545 2.27476 0.191138 2.09126 0.115129C1.90776 0.0391207 1.71109 1.47983e-09 1.51247 0C1.31385 -1.47983e-09 1.11717 0.0391207 0.93367 0.115129C0.750169 0.191138 0.583436 0.302545 0.442991 0.442991C0.302545 0.583436 0.191138 0.750169 0.115129 0.93367C0.0391207 1.11717 -1.47983e-09 1.31385 0 1.51247C1.47983e-09 1.71109 0.0391207 1.90776 0.115129 2.09126C0.191138 2.27476 0.302545 2.4415 0.442991 2.58194L7.86105 10L0.442991 17.4181C0.302545 17.5585 0.191138 17.7252 0.115129 17.9087C0.0391207 18.0922 0 18.2889 0 18.4875C0 18.6862 0.0391207 18.8828 0.115129 19.0663C0.191138 19.2498 0.302545 19.4166 0.442991 19.557C0.583436 19.6975 0.750169 19.8089 0.93367 19.8849C1.11717 19.9609 1.31385 20 1.51247 20C1.71109 20 1.90776 19.9609 2.09126 19.8849C2.27476 19.8089 2.4415 19.6975 2.58194 19.557L10 12.1389L17.4181 19.557C17.5585 19.6975 17.7252 19.8089 17.9087 19.8849C18.0922 19.9609 18.2889 20 18.4875 20C18.6862 20 18.8828 19.9609 19.0663 19.8849C19.2498 19.8089 19.4166 19.6975 19.557 19.557C19.6975 19.4166 19.8089 19.2498 19.8849 19.0663C19.9609 18.8828 20 18.6862 20 18.4875C20 18.2889 19.9609 18.0922 19.8849 17.9087C19.8089 17.7252 19.6975 17.5585 19.557 17.4181L12.1389 10L19.557 2.58194C20.1335 2.00549 20.1335 1.03462 19.557 0.458161Z"
              />
            </svg>
          </div>
          <NavBar :navItems="navItems" textColor="black" />
          <Button
            :isDisabled="false"
            :isFilled="true"
            :content="isWalletConnected ? walletSignerAddress ? walletSignerAddress.slice(0, 10) + '...' + walletSignerAddress.slice(-2) :'disconnect' : 'connect'"
            :isComingSoon="false"
            class="float-right mx-auto"
            @click="sharedConnect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType, reactive } from 'vue';
import NavBar from './NavBar.vue';
import Logo from './Logo.vue';
import Button from './Button.vue';
import type { Window as KeplrWindow } from '@keplr-wallet/types';
import { useStore } from '@nanostores/vue';
import { isMenuOpen } from '../state/menuState';
import { isWallet, sharedConnect } from '../utils/wallet';
import { isWalletConnected, walletSignerAddress } from '../state/walletState';
import { shortenArchAddress } from '../utils/arch';

declare global {
  interface Window extends KeplrWindow {}
}

export default {
  components: { NavBar, Logo, Button },
  methods: {
    sharedConnect,
    shortenArchAddress,
    toogleMenu() {
      isMenuOpen.set(!this.isMenuOpenValue);
    },
  },
  props: {
    navItems: {
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
    const $isMenuOpen = useStore(isMenuOpen);
    const $collectionDescription = useStore(isWalletConnected);
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
