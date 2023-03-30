<template>
  <div class="float-left">
    <HeaderTitle />
    <div class="my-8">
      <HeaderSubtitle />
    </div>
    <div class="float-left">
      <Button
        :isDisabled="true"
        :isFilled="true"
        content="integrate docs"
        :isComingSoon="true"
        color="black"
        class="mr-2 sm:mr-4"
      />
      <Button :isFilled="true" content="create token" color="black" />
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
