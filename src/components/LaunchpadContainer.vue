<template>
  <div class="grid">
    <div v-if="finished.length >= 1">
      <LaunchpadLiveMinting
        :collectionImages="finished[0].collectionImages"
        :collectionImg="finished[0].collectionImg"
        :collectionName="finished[0].collectionName"
        :collectionSupply="finished[0].collectionSupply"
        :collectionMintPrice="finished[0].collectionMintPrice"
        :collectionEndData="finished[0].collectionEndData"
        :collectionEndTime="finished[0].collectionEndTime"
        :collectionProjectLinks="finished[0].collectionProjectLinks"
      />
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-if="liveMinting.length > 1"
      >
        <template v-for="(item, index) in liveMinting">
          <UpcomingMintBox
            v-if="index != 0"
            :collectionImages="item.collectionImages"
            :collectionImg="item.collectionImg"
            :collectionName="item.collectionName"
            :collectionSupply="item.collectionSupply"
            :collectionMintPrice="item.collectionMintPrice"
            :collectionEndData="item.collectionEndData"
            :collectionEndTime="item.collectionEndTime"
            :collectionProjectLinks="item.collectionProjectLinks"
          />
        </template>
      </div>
    </div>
    <div v-if="liveMinting.length >= 1">
      <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
        ⚫️upcoming mints
      </h1>
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-if="liveMinting.length > 1"
      >
        <template v-for="(item, index) in liveMinting">
          <UpcomingMintBox
            :collectionImages="item.collectionImages"
            :collectionImg="item.collectionImg"
            :collectionName="item.collectionName"
            :collectionSupply="item.collectionSupply"
            :collectionMintPrice="item.collectionMintPrice"
            :collectionEndData="item.collectionEndData"
            :collectionEndTime="item.collectionEndTime"
            :collectionProjectLinks="item.collectionProjectLinks"
            status="upcoming"
          />
        </template>
      </div>
    </div>
    <div v-if="liveMinting.length >= 1">
      <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
        ⚫️completeed mints
      </h1>
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-if="liveMinting.length > 1"
      >
        <template v-for="(item, index) in liveMinting">
          <UpcomingMintBox
            :collectionImages="item.collectionImages"
            :collectionImg="item.collectionImg"
            :collectionName="item.collectionName"
            :collectionSupply="item.collectionSupply"
            :collectionMintPrice="item.collectionMintPrice"
            :collectionEndData="item.collectionEndData"
            :collectionEndTime="item.collectionEndTime"
            :collectionProjectLinks="item.collectionProjectLinks"
            status="finished"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LaunchpadLiveMinting from './LaunchpadLiveMinting.vue';
import UpcomingMintBox from './UpcomingMintBox.vue';
import { getLaunchpadEntries } from '../utils/evolve';
/**
 * 
:denom="finished[0].costDenom"
:name="finished[0].name"
:description="finished[0].description"
:endTime="finished[0].endTime"
:startTime="finished[0].startTime"
:discordUrl="finished[0].discordUrl"
:twitterUrl="finished[0].twitterUrl"
:projectUrl="finished[0].twitterUrl"
:thumbnail="finished[0].thumbnail"
:tokenCost="finished[0].tokenCost"
:supply="finished[0].totalTokens"
:preview="finished[0].preview"
:soldTokens="finished[0].soldTokens"
 */
export default {
  components: { LaunchpadLiveMinting, UpcomingMintBox },
  data() {
    return {
      liveMinting: [
        {
          collectionImages: ['/alien.png', '/alien.png'],
          collectionImg: '/evolvnft-collection-logo.svg',
          collectionName: 'evolving beasts',
          collectionSupply: 2137,
          collectionMintPrice: '4.20 uconst',
          collectionEndData: '12',
          collectionEndTime: '13',
          collectionProjectLinks: 'ddf',
        },
        {
          collectionImages: ['/alien.png', '/alien.png'],
          collectionImg: '/evolvnft-collection-logo.svg',
          collectionName: 'evolving beasts',
          collectionSupply: 2137,
          collectionMintPrice: '4.21 uconst',
          collectionEndData: '12',
          collectionEndTime: '13',
          collectionProjectLinks: 'ddf',
        },
        {
          collectionImages: ['/alien.png', '/alien.png'],
          collectionImg: '/evolvnft-collection-logo.svg',
          collectionName: 'evolving beasts',
          collectionSupply: 2137,
          collectionMintPrice: '4.21 uconst',
          collectionEndData: '12',
          collectionEndTime: '13',
          collectionProjectLinks: 'ddf',
        },
      ],
      finished: [] as any[],
      ongoing: [] as any[],
      upcoming: [] as any[],
      next: null as null | string,
    };
  },
  methods: {
    setLaunchpadEntries(launchpadEntries: {
      finished?: any[] | undefined;
      ongoing?: any[] | undefined;
      upcoming?: any[] | undefined;
      next: string;
    }) {
      this.next = launchpadEntries.next;
      
      if (launchpadEntries.finished)
        this.finished.push(...launchpadEntries.finished);
      if (launchpadEntries.ongoing)
        this.ongoing.push(...launchpadEntries.ongoing);
      if (launchpadEntries.upcoming)
        this.upcoming.push(...launchpadEntries.upcoming);
    },
    async loadLaunchpadEntries() {
      const launchpadEntries = await getLaunchpadEntries();
      this.setLaunchpadEntries(launchpadEntries);

      while (this.next) {
        const launchpadEntries = await getLaunchpadEntries(this.next);
        this.setLaunchpadEntries(launchpadEntries);
      }
    },
  },
  async mounted() {
    await this.loadLaunchpadEntries();
    console.log(this.finished);
  },
};
</script>
