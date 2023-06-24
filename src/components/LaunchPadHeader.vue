<template>
  <div>
    <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal" >
        evolvnft launchpad: 
        <span class="text-indigo-500">discover</span>
        a
        <span class="text-indigo-500">new</span>
        dimension of 
        <span class="text-indigo-500">NFTs</span>
        
    </h1>
    <div class="my-8">
      <HeaderSubtitle content="evolvnft provides the first fully decentralized metadata allowing you to create amazing evolving collections. discover some of them here!"/>
    </div>
    <div class="float-left flex">
      <Button
        :isFilled="true"
        content="upcoming projects"
        color="indigo"
        class="mr-2"
      />
      <Button
        :isDisabled="true"
        :isFilled="true"
        content="marketplace"
        :isComingSoon="true"
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
import HeaderSubtitle from './HeaderSubtitle.vue';
import Button from './Button.vue';

export default {
  components: { HeaderSubtitle, Button },

};

</script>
