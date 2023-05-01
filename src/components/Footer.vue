<template>
  <footer class="mt-16 border-t-2 border-zink-300 pt-8 p-10 lg:pb-20">
    <div class="container mx-auto px-24">
      <Logo class="float-left" />
      <div
        class="w-full grid md:grid-cols-3 gap-8 lg:gap-14 float-left py-10"
      >
        <FooterButton content="twitter" :isDisabled="false" href="https://twitter.com/evolv_nft"/>
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
