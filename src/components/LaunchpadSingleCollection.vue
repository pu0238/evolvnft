<template>
  <div class="w-full min-h-[50vh] relative overflow-hidden">
    <img
      draggable="false"
      class="-top-5 sm:top-[5rem] md:top-5 lg:top-5 xl:top-8 2xl:top-5 left-5 sm:left-6 md:left-7 lg:left-10 xl:left-12 2xl:left-[5rem] w-[5rem] sm:w-[8rem] md:w-[12rem] lg:w-[16rem] xl:w-[20rem] 2xl:w-[25rem] my-8 lg:my-12 mx-auto -rotate-[17deg] absolute -z-10 opacity-30 sm:opacity-100 md:opacity-100 lg:opacity-100 xl:opacity-100 2xl:opacity-100"
      :src="
        launchpadData.preview[0].a.length === 42
          ? `https://arweave.net/${launchpadData.preview[0].a}`
          : `${carnister}/${launchpadData.preview[0].a}/${launchpadData.preview[0].b}/${launchpadData.preview[0].c}`
      "
      alt="First Collection Image"
    />
    <img
      draggable="false"
      class="top-0 md:top-[1rem] lg:top-[4rem] xl:top-[2rem] 2xl:top-[5rem] right-5 md:right-[2rem] lg:right-[4rem] xl:right-[4rem] 2xl:right-[5rem] w-[7rem] md:w-[10rem] lg:w-[12rem] xl:w-[15rem] 2xl:w-[17rem] mt-[8rem] xl:mt-[12rem] rotate-[20deg] sm:rotate-[25deg] md:rotate-[35deg] lg:rotate-[25deg] xl:rotate-[30deg] 2xl:rotate-[30deg] absolute -z-10 opacity-40 sm:opacity-100 md:opacity-100 lg:opacity-100 xl:opacity-100 2xl:opacity-100"
      :src="
        launchpadData.preview[1].a.length === 42
          ? `https://arweave.net/${launchpadData.preview[1].a}`
          : `${carnister}/${launchpadData.preview[1].a}/${launchpadData.preview[1].b}/${launchpadData.preview[1].c}`
      "
      alt="Secound Collection Image"
    />
    <img
      draggable="false"
      class="top-3 sm:top-5 lg:top-7 xl:top-7 right-4 sm:right-2 md:right-3 lg:right-10 xl:right-15 2xl:right-[5rem] w-[5rem] md:w-[9rem] lg:w-[11rem] xl:w-[14rem] 2xl:w-[16rem] rotate-[9deg] sm:rotate-[7deg] md:rotate-[10deg] 2xl:rotate-[10deg] absolute -z-10 opacity-30 sm:opacity-100 md:opacity-100 lg:opacity-100 xl:opacity-100 2xl:opacity-100"
      :src="
        launchpadData.preview[2].a.length === 42
          ? `https://arweave.net/${launchpadData.preview[2].a}`
          : `${carnister}/${launchpadData.preview[2].a}/${launchpadData.preview[2].b}/${launchpadData.preview[2].c}`
      "
      alt="Thrid collection image"
    />
    <grid class="grid justify-items-center">
      <h2
        class="text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-black font-cal text-center"
      >
        {{ launchpadData.name }}
      </h2>
      <div class="my-2">
        <p
          class="text-sm font-semibold sm:font-normal md:text-md lg:text-lg xl:text-xl text-black font-josefin text-center w-[18rem] sm:w-[25rem] md:w-[22rem] lg:w-[33rem] xl:w-[40rem] 2xl:w-[42rem] ]"
        >
          {{ launchpadData.description }}
        </p>
      </div>

      <div class="my-[4rem] font-josefin w-[16rem] grid text-center">
        <div v-if="userCanMint" class="my-2 order-last flex mx-auto">
          <Button
            :isFilled="true"
            content="      mint      "
            color="indigo"
            class="flex"
            @click="claimToken"
          />
        </div>
        <template v-if="launchpadData.whitelistEnd">
          <div class="border-b-zinc-300 border-b-[1px] text-base">
            whitelist minting starts at:
            <p class="font-semibold text-lg">
              {{ parseTime(launchpadData.startTime) }}
              {{ parseDate(launchpadData.startTime) }}
            </p>
          </div>
          <div class="text-base">
            open mint starts at:
            <p class="font-semibold text-lg">
              {{ parseTime(launchpadData.whitelistEnd) }}
              {{ parseDate(launchpadData.whitelistEnd) }}
            </p>
          </div>
        </template>
        <div class="text-base" v-else>
          open mint starts at:
          <p class="font-semibold text-lg">
            {{ parseTime(launchpadData.startTime) }}
            {{ parseDate(launchpadData.startTime) }}
          </p>
        </div>
      </div>
    </grid>

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
            <span v-for="img in launchpadData.preview.slice(0, maxLatestDrops)">
              <img
                :src="
                  img.length === 42
                    ? `https://arweave.net/${img.a}`
                    : `${carnister}/${img.a}/${img.b}/${img.c}`
                "
              />
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
            <p class="font-semibold float-right">
              {{
                Math.round(
                  (launchpadData.soldTokens / launchpadData.totalTokens) * 100,
                )
              }}
              %
            </p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                class="bg-indigo-500 h-2.5 rounded-full"
                :style="`width: ${Math.round(
                  (launchpadData.soldTokens / launchpadData.totalTokens) * 100,
                )}%`"
              ></div>
            </div>
          </div>
          <br />
          <!--
          <div class="py-4">
            you have minted:
            <p class="font-semibold float-right">1/2</p>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue';
import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';
import type { LaunchpadItem } from '../utils/types/LaunchpadItem';
import type { PropType } from 'vue';
import { CARNISTER_API_URL } from '../utils/constant';
import { parseDate, parseTime } from '../utils/schared';

import { claimLaunchpadToken } from '../utils/evolve';


export default {
  components: {
    Button,
    LaunchpadCollectionLogo,
  },
  data() {
    return {
      userCanMint: false,
      maxLatestDrops: 3,
    };
  },
  props: {
    launchpadData: {
      type: Object as PropType<LaunchpadItem>,
      required: true,
    },
  },
  computed: {
    carnister: () => CARNISTER_API_URL,
  },
  methods: {
    parseDate,
    parseTime,
    async claimToken() {
      await claimLaunchpadToken(
        this.launchpadData.address,
        this.launchpadData.tokenCost,
        this.launchpadData.costDenom,
      );
    },
    checkDidUserCanMint() {
      const startTime = Number(this.launchpadData.startTime) * 1000;
      const endTime = Number(this.launchpadData.endTime) * 1000;
      const currentTime = new Date().getTime();

      if (this.launchpadData.whitelistEnd) {
        const whitelistEnd = Number(this.launchpadData.whitelistEnd) * 1000;
        // TODO: is user whitelisted?
        if (currentTime > whitelistEnd && currentTime < endTime) {
          this.userCanMint = true;
        }
      } else {
        // TODO: is user whitelisted?
        if (currentTime > startTime && currentTime < endTime) {
          this.userCanMint = true;
        }
      }
    },
  },
  mounted() {
    this.checkDidUserCanMint();
  },
};
</script>
