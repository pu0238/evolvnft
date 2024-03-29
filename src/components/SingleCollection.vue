<template>
  <div class="grid sm:flex w-full">
    <div class="flex-auto">
      <div class="flex-auto mb-8">
        <Button
          content="back"
          arrow="left"
          color="black"
          class="mb-4"
          @click="$emit('back')"
        />
      </div>
      <div class="flex-auto ml-8 pb-4">
        <h1 class="text-5xl xl:text-6xl 2xl:text-7xl font-cal text-black">
          actions
        </h1>
        <p class="text-lg md:text-xl 2xl:text-2xl font-josefin text-zinc-700">
          In this tab you can view and edit the NFTs you have created!
        </p>
      </div>
      <div class="w-full grid">
        <div class="mx-auto">
          <CollectionBaner
            class="xl:hidden mb-8 xl:h-[40rem]"
            bgColor="black"
            :collectionImg="collection?.thumbnail || undefined"
            :collectionTitle="collection?.name"
            :collectionDescription="collection?.description"
            :collectionSymbol="collection?.symbol"
            :rewardsPercentageFee="collection?.rewards_percentage_fee"
            :accumulatedRewards="collection?.accumulated_rewards"
          />
        </div>
        <div class="mx-auto">
          <MintBox
            v-if="mintBox"
            @close="() => (mintBox = !mintBox)"
            :collectionAddress="collectionAddress"
            :afterMint="loadCollectionData()"
            :collection="collection"
          />
        </div>
      </div>
      <div class="flex mx-auto mt-8">
        <div class="grid gap-2 md:grid-cols-2 2xl:grid-cols-3 mx-auto">
          <div v-for="action in actions">
            <Actions
              :collectionImg="action.img"
              :collectionTitle="action.title"
              :collectionDescription="action.description"
              :active="action.active"
              @click="openBox(action.tag)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="hidden xl:flex xl:order-last mx-auto">
      <CollectionBaner
        class="xl:h-[40rem]"
        bgColor="black"
        :collectionImg="collection?.thumbnail || undefined"
        :collectionTitle="collection?.name"
        :collectionDescription="collection?.description"
        :collectionSymbol="collection?.symbol"
        :rewardsPercentageFee="collection?.rewards_percentage_fee"
        :accumulatedRewards="collection?.accumulated_rewards"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Window as KeplrWindow } from '@keplr-wallet/types';
import CollectionBaner from './CollectionBaner.vue';
import Actions from './Actions.vue';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import MintBox from './MintBox.vue';
import Button from './Button.vue';
import { getArchwaySigner } from '../utils/wallet';
import { getCollectionManager } from '../utils/evolve';

declare global {
  interface Window extends KeplrWindow {}
}

export default {
  emits: ['back', 'singleCollection', 'tokens'],
  components: {
    CollectionBaner,
    Actions,
    MintBox,
    Button,
  },
  data() {
    return {
      evolv: true,
      mintBox: false,
      actions: [
        {
          img: '/mint-black.svg',
          title: 'mint NFT',
          description: 'Mint any amount of NFT from your collection',
          active: true,
          tag: 'mint',
        },
        {
          img: '/evolv-metadata-black.svg',
          title: 'evolv metadata',
          description: 'Evolv metadata of specific NFT',
          active: true,
          tag: 'evolv',
        },
        {
          img: '/launchpad-black.svg',
          title: 'join to launchpad',
          description: 'Apply for your collection to launchpad',
          active: false,
          tag: 'launchpad',
        },
        {
          img: '/candie-machine-black.svg',
          title: 'candie machine',
          description:
            'Add a certain number of your NFTs to the candie machine',
          active: false,
          tag: 'candiemachine',
        },
        {
          img: '/sdk-black.svg',
          title: 'sdk integration',
          description: 'Turn your NFT into game items or financial assets',
          active: false,
          tag: 'sdk',
        },
      ],
      collection: undefined as unknown as CollectionEntitie,
    };
  },
  props: {
    collectionAddress: {
      type: String,
      required: true,
    },
    back: {
      type: Function,
    },
    singleCollection: {
      type: Function,
    },
  },
  methods: {
    openBox(tag: string) {
      if (tag === 'mint') this.mintBox = true;
      if (tag === 'evolv') {
        this.$emit('singleCollection', this.collection);
      }
    },
    async getCollection(): Promise<void | CollectionEntitie> {
      const { signerAddress, archwaySigner } = await getArchwaySigner();

      const get_collection = {
        address: this.collectionAddress,
      };

      const collectionManagerContract = await getCollectionManager();
      const data = await archwaySigner.queryContractSmart(
        collectionManagerContract,
        {
          get_collection,
        },
      );
      return data;
    },
    async loadCollectionData() {
      if (this.collectionAddress) {
        const collectionData = await this.getCollection();
        if (collectionData) {
          this.collection = collectionData;
        }
      }
    },
  },
  async mounted() {
    await this.loadCollectionData();
  },
};
</script>
