<template>
  <header>
    <div class="w-full xl:grid xl:grid-cols-2 xl:gap-4 float-left">
      <HeaderLeft class="py-10 md:max-w-lg lg:max-w-2lg xl:max-w-xl"/>
      <img draggable="false"  class="float-right hidden lg:block lg:w-96 xl:w-auto" src="/evolve-tree.svg" />
    </div>
  </header>
</template>

<script lang="ts">
import HeaderLeft from "./HeaderLeft.vue";

export default {
  components: { HeaderLeft },
};
</script>
