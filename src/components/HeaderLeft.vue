<template>
  <div class="float-left">
    <HeaderTitle />
    <div class="my-8">
      <HeaderSubtitle />
    </div>
    <div class="float-left flex">
      <Button
        :isDisabled="true"
        :isFilled="true"
        content="integrate docs"
        :isComingSoon="true"
        color="black"
        class="mr-2"
      />
      <Button
        :isFilled="true"
        content="create token"
        color="black"
        class="flex-0"
        href="/create"
        :isWalletStricted="true"
        client:only
      />
    </div>
  </div>
</template>

<script lang="ts">
import HeaderTitle from "./HeaderTitle.vue";
import HeaderSubtitle from "./HeaderSubtitle.vue";
import Button from "./Button.vue";

export default {
  components: { HeaderTitle, HeaderSubtitle, Button },
};
</script>
