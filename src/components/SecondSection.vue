<template>
  <div class="bg-black float-left p-8 sm:p-12 md:p-16 rounded-[3rem] xl:min-h-[32rem]">
    <SecondSectionLeft class="float-left" />
    <img draggable="false"  class="float-left hidden xl:block xl:w-[30rem] 2xl:block 2xl:w-fit" src="/development-process.svg" />
  </div>
</template>

<script lang="ts">
import SecondSectionLeft from "./SecondSectionLeft.vue";
import HeaderSubtitle from "./HeaderSubtitle.vue";
import Button from "./Button.vue";

export default {
  components: { SecondSectionLeft, HeaderSubtitle, Button },
};
</script>
