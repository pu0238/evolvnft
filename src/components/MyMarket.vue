<template>
  <div class="w-full">
    <div
      class="w-full mt-4 grid grid-flow-col justify-stretch text-center font-josefin cursor-pointer text-lg pb-2"
    >
      <p
        class="border-b-2 border-zink-300 hover:border-indigo-500 pb-1 duration-300 ease-out hover:text-indigo-500"
        :class="{ 'text-indigo-500 border-indigo-500': 'offers' === openTab }"
        @click="openTab = 'offers'"
      >
        offers
      </p>
      <p
        class="border-b-2 border-zink-300 hover:border-indigo-500 pb-1 duration-300 ease-out hover:text-indigo-500"
        :class="{ 'text-indigo-500 border-indigo-500': 'on sale' === openTab }"
        @click="openTab = 'on sale'"
      >
        on sale
      </p>
    </div>
    <div v-if="'offers' === openTab">
      <div
        v-if="tokensMetadata"
        v-for="offer in userOffers"
        class="border-b-2 border-zink-300 flex font-josefin px-2 justify-self-stretch py-1"
      >
        <img
          class="w-20 h-20 bg-black rounded-lg"
          :class="{
            'p-2':
              !tokensMetadata[offer.collection].tokens[offer.tokenId].metadata
                ?.image,
          }"
          :src="
            tokensMetadata[offer.collection].tokens[offer.tokenId].metadata
              ?.image || 'evolvnft-collection-logo.svg'
          "
        />
        <div class="w-full px-2">
          <div class="flex justify-between items-center">
            <a
              class="flex items-center font-cal text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
              :href="`/marketplace?tokenId=${offer.tokenId}#${offer.collection}`"
              target="_blank"
            >
              #{{ offer.tokenId }}
            </a>
            <div class="flex items-center font-cal">
              <img draggable="false" :src="denomLogo" class="w-4 mx-1 my-2" />
              <span>{{ aarchToArch(Number(offer.offer.amount)) }}</span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="text-bottom mt-auto">
              collection
              <a
                class="text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
                :href="`/marketplace#${offer.collection}`"
                target="_blank"
              >
                {{ shortenArchAddress(offer.collection) }}
              </a>
            </div>
            <div class="flex">
              <Button
                content="cancel"
                @click="cancelOfferForToken(offer.collection, offer.tokenId)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from '@nanostores/vue';
import { computed } from 'vue';
import { walletSignerAddress } from '../state/walletState';
import {
  cancelOffer,
  getAddressTokenOffers,
  getCollection,
} from '../utils/evolve';
import type { UserOffers } from '../utils/types/UserOffers';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import { aarchToArch, shortenArchAddress } from '../utils/arch';
import Button from '../components/Button.vue';
import { isWallet } from '../utils/wallet';

export default {
  components: { Button },
  data() {
    return {
      openTab: 'offers' as 'offers' | 'on sale',
      userOffers: undefined as undefined | UserOffers[],
      tokensMetadata: undefined as undefined | { [key: string]: any },
    };
  },
  props: {
    denomLogo: {
      type: String,
      default: () => 'arch-logo.svg',
    },
  },
  methods: {
    shortenArchAddress,
    aarchToArch,
    async cancelOfferForToken(collection: string, tokenId: string) {
      if (this.tokensMetadata && this.userOffers) {
        await cancelOffer(collection, tokenId);
        this.userOffers = this.userOffers.filter(function (obj) {
          return obj.collection !== collection && obj.tokenId !== tokenId;
        });
      }
    },
    async getMetadata(url: string) {
      const response = await fetch(url);
      if (response && response?.ok) return await response.json();
    },
    async joinTokensAndCollections() {
      console.log(this.userOffers);
      if (this.userOffers) {
        const collectionTokens: {
          [key: string]: {
            tokens: { [key: string]: { metadataUrl?: string; metadata?: any } };
            collectionData: CollectionEntitie;
          };
        } = {};
        this.userOffers.forEach((offer) => {
          if (collectionTokens[offer.collection]) {
            collectionTokens[offer.collection]['tokens'][offer.tokenId] = {};
          } else {
            collectionTokens[offer.collection] = {
              ...collectionTokens[offer.collection],
              tokens: { [offer.tokenId]: {} },
            };
          }
        });

        const collectionAddresses = Object.keys(collectionTokens);
        const collectionPromise = collectionAddresses.map((collectionAddress) =>
          getCollection(collectionAddress),
        );

        const collectionsData = await Promise.all(collectionPromise);

        await Promise.all(
          collectionAddresses.map(async (collectionAddress, colIndex) => {
            collectionTokens[collectionAddress].collectionData =
              collectionsData[colIndex];

            const tokens =
              collectionTokens[collectionAddress].collectionData.tokens;
            if (tokens) {
              await Promise.all(
                Object.keys(collectionTokens[collectionAddress].tokens).map(
                  async (tokenId) => {
                    const tokenMetadataUri = tokens[tokenId].token_uri;

                    collectionTokens[collectionAddress].tokens[
                      tokenId
                    ].metadataUrl = tokenMetadataUri;

                    collectionTokens[collectionAddress].tokens[
                      tokenId
                    ].metadata = await this.getMetadata(tokenMetadataUri);
                  },
                ),
              );
            }
          }),
        );

        this.tokensMetadata = collectionTokens;
      }
    },
    async loadTokenData() {
      console.log('walletSignerAddress', this.walletSignerAddress);
      if (this.walletSignerAddress) {
        this.userOffers = await getAddressTokenOffers(this.walletSignerAddress);
        await this.joinTokensAndCollections();
      }
    },
  },
  async mounted() {
    await this.loadTokenData();
  },
  setup() {
    isWallet();
    const $walletSignerAddress = useStore(walletSignerAddress);

    return {
      walletSignerAddress: computed(() => $walletSignerAddress.value),
    };
  },
};
</script>
