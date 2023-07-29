<template>
    <div class="float-left py-10 md:max-w-lg lg:max-w-2lg xl:max-w-4xl">
      <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal">
        buy, sell and discover
        <span class="text-indigo-500">NFTs</span>
      </h1>
      <div class="my-8">
        <HeaderSubtitle
          content="you will discover many interesting collections created by the archway community!"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import HeaderSubtitle from './HeaderSubtitle.vue';
  import Button from './Button.vue';
  
  export default {
    components: { HeaderSubtitle, Button },
  };
  </script>
  