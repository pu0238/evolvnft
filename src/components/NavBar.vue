<template>
  <nav class="mx-auto">
    <ul class="lg:float-left">
      <NavItem
        v-for="(item, index) in navItems"
        :isComingSoon="item.isComingSoon"
        :content="item.content"
        textColor="black"
        :href="item.href"
        :isWalletStricted="item.isWalletStricted"
        :targetBlank="item.targetBlank"
        @click="scrollToElement"
      />
    </ul>
  </nav>
</template>

<script lang="ts">
import { useStore } from '@nanostores/vue';
import { computed, PropType, reactive } from 'vue';
import { isMenuOpen } from '../state/menuState';
import NavItem from './NavItem.vue';

export default {
  components: { NavItem },
  methods: {
    scrollToElement(event: any) {
      if (!event.target.innerText) return;
      const el = document.getElementById(
        `${this.camalize(event.target.innerText)}`,
      );
      const html = document.querySelector('html');
      if (!html || !el) return;
      this.isMenuOpenValue && this.toogleMenu();
      html.scrollTo({
        top: el.getBoundingClientRect().top,
        behavior: 'smooth',
      });
    },
    camalize(str: string) {
      return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    },
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
          targetBlank: boolean | undefined
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
    textColor: {
      type: String,
      default: () => 'black',
      required: false,
      validator: (color: string) => ['white', 'black'].includes(color),
    },
    isWalletStricted: {
      type: Boolean,
      default: () => false,
      required: false,
    },
  },
  setup(props) {
    const $isMenuOpen = useStore(isMenuOpen);
    props = reactive(props);
    return { isMenuOpenValue: computed(() => $isMenuOpen.value) };
  },
};
</script>
