<template>
  <div class="w-full h-screen relative overflow-hidden">
    <img
      draggable="false"
      class="-top-5 sm:top-[5rem] md:top-5 lg:top-5 xl:top-8 2xl:top-5 left-5 sm:left-6 md:left-7 lg:left-10 xl:left-12 2xl:left-[5rem] w-[5rem] sm:w-[8rem] md:w-[12rem] lg:w-[16rem] xl:w-[20rem] 2xl:w-[25rem] my-8 lg:my-12 mx-auto -rotate-[17deg] absolute -z-10 opacity-30 sm:opacity-100 md:opacity-100 lg:opacity-100 xl:opacity-100 2xl:opacity-100"
      :src="firstThreeCollectionImages[0]"
      alt="First Collection Image"
    />
    <img
      draggable="false"
      class="top-0 md:top-[1rem] lg:top-[4rem] xl:top-[2rem] 2xl:top-[5rem] right-5 md:right-[2rem] lg:right-[4rem] xl:right-[4rem] 2xl:right-[5rem] w-[7rem] md:w-[10rem] lg:w-[12rem] xl:w-[15rem] 2xl:w-[17rem] mt-[8rem] xl:mt-[12rem] rotate-[20deg] sm:rotate-[25deg] md:rotate-[35deg] lg:rotate-[25deg] xl:rotate-[30deg] 2xl:rotate-[30deg] absolute -z-10 opacity-40 sm:opacity-100 md:opacity-100 lg:opacity-100 xl:opacity-100 2xl:opacity-100"
      :src="firstThreeCollectionImages[1]"
      alt="Secound Collection Image"
    />
    <img
      draggable="false"
      class="top-3 sm:top-5 lg:top-7 xl:top-7 right-4 sm:right-2 md:right-3 lg:right-10 xl:right-15 2xl:right-[5rem] w-[5rem] md:w-[9rem] lg:w-[11rem] xl:w-[14rem] 2xl:w-[16rem] rotate-[9deg] sm:rotate-[7deg] md:rotate-[10deg] 2xl:rotate-[10deg] absolute -z-10 opacity-30 sm:opacity-100 md:opacity-100 lg:opacity-100 xl:opacity-100 2xl:opacity-100"
      :src="firstThreeCollectionImages[2]"
      alt="Thrid collection image"
    />
    <center>
      <h2
        class="text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-black font-cal text-center md:pl-10"
      >
        evolving beasts
      </h2>
      <div class="my-2">
        <p
          class="text-sm font-semibold sm:font-normal md:text-md lg:text-lg xl:text-xl text-black font-josefin text-center w-[18rem] md:pl-10 sm:w-[25rem] md:w-[22rem] lg:w-[33rem] xl:w-[40rem] 2xl:w-[42rem] ]"
        >
          evolvNFT provides the first fully decentralized metadata allowing you
          to create amazing evolving collections. discover some of them here!
        </p>
      </div>

      <div class="my-[4rem] text-lg font-josefin w-[16rem]">
        <div v-if="isUserWhitelisted && isWhitelistOpen">
          <Button
            :isFilled="true"
            content="        mint        "
            color="indigo"
            class="mr-3"
          />
        </div>

        <div class="border-b-zinc-300 border-b-[1px]" v-else>
          whitelist minting starts at:
          <p class="font-semibold">1992.23.23 13:34</p>
        </div>
        <div>
          open minting starts at:
          <p class="font-semibold">1992.23.23 13:34</p>
        </div>
      </div>
    </center>

    <div
      class="sm:w-[36rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] 2xl:w-[85rem] lg:pt-[5rem] xl:pt-[11rem] 2xl:pt-[20rem]"
    >
      <div
        class="pl-5 sm:pb-2 text-xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl text-black font-cal"
      >
        latest mints
      </div>
      <div class="grid md:flex">
        <div
          class="relative pl-4 rounded-xl overflow-hidden w-[20rem] flex-none sm:w-[25rem] md:w-[30rem] lg:w-[40rem] xl:w-[50rem] 2xl:w-[60rem]"
        >
          <div
            class="overflow-hidden float-left flex 2xl:flex rounded-xl bg-zinc-300 p-2 m-6"
          >
            <span v-for="img in collectionImages.slice(0, maxLatestDrops)">
              <img :src="img" />
            </span>
          </div>
        </div>
        <LaunchpadCollectionLogo
          class="absolute m-6 sm:m-5 md:m-5 lg:m-3 top-[24rem] sm:top-[24rem] md:top-[24rem] lg:top-[31rem] xl:top-[37rem] 2xl:top-[45rem] w-[2.5rem] sm:w-[3rem] md:w-[3rem] lg:w-[4rem] xl:w-[4rem] 2xl:w-[5rem]"
        />
        <div
          class="flex-1 text-sm sm:text-sm sm:pl-[5rem] md:pl-5 sm:w-[23rem] w-[18rem] md:text-lg lg:text-xl xl:text-xl 2xl:text-xl px-5 pl-11 pt-1 py-[2rem] sm:pt-1 md:pr-5 font-josefin sm:py-[3rem] md:py-[3rem] lg:py-[4rem]"
        >
          <div>
            total minted:
            <p class="font-semibold float-right">100</p>
          </div>
          <br />
          <div class="py-4">
            you have minted:
            <p class="font-semibold float-right">1/2</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue';
import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';
export default {
  components: {
    Button,
    LaunchpadCollectionLogo,
  },
  data() {
    return {
      isUserWhitelisted: true,
      isWhitelistOpen: true,
      maxLatestDrops: 2,
    };
  },
  props: {
    collectionImages: {
      type: Array<string>,
      default: () => ['/alien.png', '/alien.png', '/alien.png'],
      required: true,
    },
    collectionImg: {
      type: String,
      default: () => '/evolvnft-collection-logo.svg',
      required: false,
    },
    firstThreeCollectionImages: {
      type: Array<string>,
      default: () => ['/alien.png', '/alien.png', '/alien.png'],
      required: true,
    },
  },
};
</script>
