<template>
  <div class="grid relative">
    <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal pb-2">
      recent listings
    </h1>
    <div
      class="flex relative overflow-hidden pt-5 pb-10 pl-1"
      id="recentListingsBox"
    >
      <div class="flex" id="recentListingsContainer">
        <OfferBox
          v-for="offer in listingsMetadata"
          :tokenId="offer.listing.tokenId"
          :price="aarchToArch(Number(offer.listing.price))"
          :collection="offer.listing.collection"
          :metadata="offer.metadata"
          class="absolute w-full top-1/2"
          :style="`transform: translateY(-50%) ${`translateX(-${
            page * pageSize
          }px)`};`"
        />
      </div>
    </div>
    <div
      class="relative"
      v-if="listingsMetadata && listingsMetadata?.length > 0"
    >
      <div
        class="bg-black w-12 h-12 flex rounded-full absolute bottom-36 z-20 group border-white hover:border-indigo-500 border-4 ease-out duration-300"
        @click="page--"
        v-if="page > 0"
      >
        <svg
          width="12"
          height="24"
          viewBox="0 0 12 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="m-auto fill-white group-hover:fill-indigo-500"
        >
          <path
            d="M-5.22553e-07 11.9921C-5.04251e-07 12.4108 0.0844025 12.8289 0.251134 13.2084C0.26392 13.2425 0.279997 13.2744 0.295851 13.3068C0.298409 13.3121 0.30102 13.3149 0.303578 13.3198C0.321478 13.356 0.341424 13.3923 0.360859 13.429C0.37876 13.4642 0.398719 13.4971 0.418922 13.5305L0.421419 13.5358C0.48535 13.6402 0.554679 13.7419 0.632675 13.837C0.658759 13.8687 0.686362 13.9006 0.713213 13.9305L8.3594 23.2392C9.19267 24.2536 10.5338 24.2536 11.3671 23.2392C12.2004 22.2247 12.2004 20.5903 11.3671 19.5759L7.252 14.566L4.96618 12L7.2758 9.41305L11.375 4.4225C12.2083 3.40805 12.2083 1.7753 11.375 0.76085C10.5418 -0.253602 9.19931 -0.253624 8.36603 0.760827L0.795233 9.97776L0.790083 9.98368C0.734079 10.0387 0.679124 10.0966 0.627212 10.16C0.210562 10.6672 -2.61238e-05 11.3301 -5.22553e-07 11.9921Z"
          />
        </svg>
      </div>
      <div class="grid overflow-hidden">
        <div
          class="bg-black w-12 h-12 flex rounded-full absolute bottom-36 right-0 z-20 group border-white hover:border-indigo-500 border-4 ease-out duration-300"
          @click="page++"
          v-if="page < pages - 1"
        >
          <svg
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="m-auto fill-white rotate-180 group-hover:fill-indigo-500"
          >
            <path
              d="M-5.22553e-07 11.9921C-5.04251e-07 12.4108 0.0844025 12.8289 0.251134 13.2084C0.26392 13.2425 0.279997 13.2744 0.295851 13.3068C0.298409 13.3121 0.30102 13.3149 0.303578 13.3198C0.321478 13.356 0.341424 13.3923 0.360859 13.429C0.37876 13.4642 0.398719 13.4971 0.418922 13.5305L0.421419 13.5358C0.48535 13.6402 0.554679 13.7419 0.632675 13.837C0.658759 13.8687 0.686362 13.9006 0.713213 13.9305L8.3594 23.2392C9.19267 24.2536 10.5338 24.2536 11.3671 23.2392C12.2004 22.2247 12.2004 20.5903 11.3671 19.5759L7.252 14.566L4.96618 12L7.2758 9.41305L11.375 4.4225C12.2083 3.40805 12.2083 1.7753 11.375 0.76085C10.5418 -0.253602 9.19931 -0.253624 8.36603 0.760827L0.795233 9.97776L0.790083 9.98368C0.734079 10.0387 0.679124 10.0966 0.627212 10.16C0.210562 10.6672 -2.61238e-05 11.3301 -5.22553e-07 11.9921Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { aarchToArch } from '../utils/arch';
import { getNftInfo, getRecentListings } from '../utils/evolve';
import type { RecentListings } from '../utils/types/RecentListings';
import { getMetadata } from '../utils/utils';
import OfferBox from './OfferBox.vue';

export default {
  components: { OfferBox },
  data() {
    return {
      listingsMetadata: [] as { listing: RecentListings; metadata: any }[],
      page: 0,
      pageSize: 0,
      pages: 0,
      paginator: 5,
    };
  },
  methods: {
    recentListingsWidth() {
      const recentListingsContainer = document.getElementById(
        'recentListingsContainer',
      );
      const recentListingsBox = document.getElementById('recentListingsBox');
      if (
        recentListingsBox &&
        recentListingsContainer &&
        this.listingsMetadata
      ) {
        if (recentListingsContainer?.offsetWidth === 0) return 0;
        const offerSize: number =
          recentListingsContainer?.offsetWidth / this.listingsMetadata?.length;
        return (
          offerSize * Math.floor(recentListingsBox?.offsetWidth / offerSize)
        );
      }
      return 0;
    },
    pagesLen() {
      const recentListingsContainer = document.getElementById(
        'recentListingsContainer',
      );
      if (recentListingsContainer && this.pageSize) {
        return Math.ceil(recentListingsContainer?.offsetWidth / this.pageSize);
      }
      return 0;
    },
    aarchToArch,
    async getTokenMetadata(collection: string, tokenId: string) {
      const metadataUrl = await getNftInfo(collection, tokenId);
      return await getMetadata(metadataUrl);
    },
    async dynamicLoadOffers() {
      const recentListings = await getRecentListings();
      for (
        let index = this.paginator;
        index <= recentListings.length;
        index += this.paginator
      ) {
        const paginRecentListings = recentListings.slice(
          index - this.paginator,
          index,
        );

        const fiveListingsMetadata = await Promise.all(
          paginRecentListings.map((listing) =>
            this.getTokenMetadata(listing.collection, listing.tokenId),
          ),
        );
        this.listingsMetadata.push(
          ...paginRecentListings.map((listing, index) => ({
            listing,
            metadata: fiveListingsMetadata[index],
          })),
        );
      }
    },
  },
  async mounted() {
    await this.dynamicLoadOffers();
    await this.$nextTick();
    this.pageSize = this.recentListingsWidth();
    this.pages = this.pagesLen();
  },
};
</script>
