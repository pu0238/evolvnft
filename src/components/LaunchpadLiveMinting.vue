<template>
  <div>
    <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
      🟣live minting
    </h1>
  </div>
  <div class="grid grid-cols-2 gap-4 relative">
    <div class="relative rounded-xl overflow-hidden h-96 w-96 py-2">
      <div
        class="overflow-hidden flex rounded-xl bg-zinc-300 float-left p-3 m-6"
      >
        <span v-for="img in collectionImages">
          <img :src="img" class="flex-none scale-100" />
        </span>
      </div>
      <LaunchpadCollectionLogo class="absolute" />
    </div>

    <div>
      <div class="mb-1">
        <h3 class="font-cal text-3xl">
          {{ collectionName }}
        </h3>
        <p class="font-josefin text-sm">supply: {{ collectionSupply }}</p>
      </div>
      <!-- <div class="my-2 lg:my-8">
        <p class="text-md md:text-lg lg:text-xl font-josefin">
            
        <div class="text-black text-2xl font-cal py-10">evolving beasts </div>
        <br />
          supply 999
          <br />
          do not hesitate, choose the type of token you are interested in and
          start your decentralized adventure!
        </p> 
        
      </div> -->

      <Button
        :isFilled="true"
        content="upcoming projects"
        color="indigo"
        class="mr-2 float-right"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue';
import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';
import LaunchpadLiveMintingParameter from './LaunchpadLiveMintingParameter.vue';
export default {
  components: { Button, LaunchpadCollectionLogo, LaunchpadLiveMintingParameter },
  props: {
    collectionImages: {
      type: Array<string>,
      default: () => ['/alien.png', '/alien.png'],
      required: true,
    },
    collectionImg: {
      type: String,
      default: () => '/evolvnft-collection-logo.svg',
      required: false,
    },
    collectionName: {
      type: String,
      default: () => 'evolving beasts',
      required: true,
    },
    collectionSupply: {
      type: Number,
      default: () => 0,
      required: true,
    },
  },
};
</script>
