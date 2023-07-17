<template>
  <div class="max-w-xl 2xl:max-w-2xl">
    <SecondSectionTitle textColor="white" />
    <div class="my-8">
      <HeaderSubtitle
        textColor="white"
        content="thanks to integration with several blockchains, we are able to provide tools for creating fully decentralized evolving NFTs that, change over time or be leveled!"
      />
    </div>
    <div class="w-fit">
      <Button
        :isFilled="true"
        content="create NFT"
        href="/create"
        :isWalletStricted="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SecondSectionTitle from './SecondSectionTitle.vue';
import HeaderSubtitle from './HeaderSubtitle.vue';
import Button from './Button.vue';

export default {
  components: { SecondSectionTitle, HeaderSubtitle, Button },
};
</script>
