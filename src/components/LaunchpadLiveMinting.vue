<template>
  <div>
    <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal">
      🟣live minting
    </h1>

    </div>



<div class="relative rounded-xl overflow-hidden h-96 w-96">
    <div class="bg-zinc-300 float-left">
        <div class="overflow-hidden flex rounded-xl">
            
          <span v-for="img in collectionImages" >
            <img :src="img" class="flex-none p-3 h-96 w-max-w-none"   />
            
          </span>

        </div>
    </div>
</div>

      <div class="float-right flex">
        <Button
          :isFilled="true"
          content="upcoming projects"
          color="indigo"
          class="mr-2 float-right"
        
        />
      </div>
    <div>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue';

export default {
  components: { Button },
  props: {
    collectionImages: {
      type: Array<string>,
      default: () => ['/alien.png', '/alien.png'],
      required: true,
    },
  },
};
</script>
