<template>
  <div class="float-left max-w-3xl">
    <ThirdSectionTitle />
    <div class="my-8 ">
      <HeaderSubtitle
        content="NFT is tokens with huge potential it's time to unlock it. create games, modern decentralized assets that can change according to your needs"
      />
    </div>
    <div class="float-left">
      <Button :isFilled="true" content="start building" />
    </div>
  </div>
</template>

<script lang="ts">
import ThirdSectionTitle from "./ThirdSectionTitle.vue";
import HeaderSubtitle from "./HeaderSubtitle.vue";
import Button from "./Button.vue";

export default {
  components: { ThirdSectionTitle, HeaderSubtitle, Button },
};
</script>
