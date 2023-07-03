<template>
  <div class="grid">
    <div v-if="liveMinting.length >= 1">
      <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
        🟣live minting
      </h1>
      <LaunchpadLiveMinting
        :collectionImages="liveMinting[0].collectionImages"
        :collectionImg="liveMinting[0].collectionImg"
        :collectionName="liveMinting[0].collectionName"
        :collectionSupply="liveMinting[0].collectionSupply"
        :collectionMintPrice="liveMinting[0].collectionMintPrice"
        :collectionEndData="liveMinting[0].collectionEndData"
        :collectionEndTime="liveMinting[0].collectionEndTime"
        :collectionProjectLinks="liveMinting[0].collectionProjectLinks"
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

<script>
import LaunchpadLiveMinting from './LaunchpadLiveMinting.vue';
import UpcomingMintBox from './UpcomingMintBox.vue';
import { getLaunchpadEntries } from '../utils/evolve';

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
    };
  },
  mounted() {
    getLaunchpadEntries().then((a) => {
      console.log(a);
    });
  },
};
</script>
