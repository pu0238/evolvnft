<template>
  <footer class="mt-32 border-t-2 border-zink-300 pt-8 pb-20">
    <div class="container mx-auto px-24">
      <Logo class="float-left" />
      <div
        class="w-full grid md:grid-cols-3 gap-14 float-left py-10 text-xl font-josefin"
      >
        <FooterButton content="twitter" :isDisabled="true" />
        <FooterButton content="discord" :isDisabled="true" />
        <FooterButton content="telegram" :isDisabled="true" />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import FooterButton from "./FooterButton.vue";
import Logo from "./Logo.vue";

export default {
  components: { FooterButton, Logo },
};
</script>
