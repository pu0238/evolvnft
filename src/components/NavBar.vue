<template>
  <nav>
    <ul>
      <NavItem
        v-for="(item, index) in navItems"
        :isComingSoon="item.isComingSoon"
        :content="item.content"
        textColor="black"
        @click="scrollToElement"
      />
    </ul>
  </nav>
</template>

<script lang="ts">
import { PropType, reactive } from "vue";
import NavItem from "./NavItem.vue";

export default {
  components: { NavItem },
    methods: {
    scrollToElement(event: any) {
      if(!event.target.innerText) return;
      const el = document.querySelector(`#${this.camalize(event.target.innerText)}`);
      const html = document.querySelector("html");
      if (!html || !el) return;
      html.scrollTo({
        top: el.getBoundingClientRect().top,
        behavior: "smooth",
      });
    },
    camalize(str: string) {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
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
    textColor: {
      type: String,
      default: "black",
      required: false,
      validator: (color: string) => ["white", "black"].includes(color),
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
