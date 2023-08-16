<template>
  <div>
    <div
      v-if="openToken"
      class="bg-black/30 text-white w-full h-full fixed top-0 left-0 z-20 backdrop-blur-sm cursor-pointer"
      @click="toogleOpen()"
    ></div>
    <ProductsCart
      v-if="currentCollectionData && openCollectionToken"
      :open="openToken"
      :title="`${currentCollectionData.name} #${openCollectionToken?.tokenId}`"
      @close="toogleOpen"
      class="overflow-auto"
    >
      <div class="flex flex-1 flex-col justify-between">
        <div>
          <img
            v-if="
              openCollectionToken.metadata && openCollectionToken.metadata.image
            "
            draggable="false"
            class="w-44 mx-auto sm:w-72 md:w-96 rounded-2xl"
            :src="openCollectionToken.metadata.image"
          />
          <img
            v-else
            draggable="false"
            class="w-44 mx-auto sm:w-72 md:w-96 rounded-2xl p-8"
            src="evolvnft-collection-logo.svg"
          />
          <div class="text-white flex font-josefin mt-4">
            <div class="grid w-full">
              <span class="mb-3" v-if="walletSignerAddress">
                owner
                <a
                  class="text-indigo-500 font-semibold ease-out duration-300 hover:text-indigo-600"
                  :href="`${blockchainScan}${walletSignerAddress}`"
                  target="_blank"
                >
                  {{ shortenArchAddress(walletSignerAddress) }}
                </a>
              </span>
              <div class="flex mb-2 border-b-2 border-zinc-900">
                <span
                  @click="openTokenSubPage = 'details'"
                  class="group hover:border-b-2 border-indigo-500"
                  :class="{
                    'border-indigo-500 text-indigo-500 border-b-2':
                      openTokenSubPage === 'details',
                  }"
                >
                  <span
                    class="px-2 pb-1 ease-out duration-3200 group-hover:text-indigo-500"
                  >
                    details
                  </span>
                </span>
              </div>
              <div v-if="openTokenSubPage === 'details'">
                <template v-if="openCollectionToken.metadata">
                  <span class="flex items-center text-xl mb-2">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8"
                    >
                      <path
                        d="M9.00008 19.7179C8.65063 19.7234 8.30584 19.6372 8.00008 19.4679L7.70008 19.2979C5.36335 17.9759 3.41934 16.0574 2.06655 13.7383C0.713767 11.4193 0.000670048 8.78274 8.0152e-05 6.09795V5.95795C-0.00308979 5.60384 0.0878186 5.25523 0.263514 4.94777C0.439209 4.6403 0.693391 4.385 1.00008 4.20795L8.00008 0.267949C8.30412 0.0924127 8.64901 0 9.00008 0C9.35115 0 9.69604 0.0924127 10.0001 0.267949L17.0001 4.20795C17.3068 4.385 17.561 4.6403 17.7366 4.94777C17.9123 5.25523 18.0033 5.60384 18.0001 5.95795V6.09795C17.9975 8.78472 17.2814 11.4226 15.925 13.7418C14.5686 16.0611 12.6205 17.9785 10.2801 19.2979L9.98008 19.4679C9.68023 19.6339 9.34277 19.72 9.00008 19.7179ZM9.00008 2.01795L2.00008 5.95795V6.09795C2.00176 8.42905 2.62308 10.7178 3.80038 12.7298C4.97769 14.7417 6.66866 16.4046 8.70008 17.5479L9.00008 17.7179L9.30008 17.5479C11.3315 16.4046 13.0225 14.7417 14.1998 12.7298C15.3771 10.7178 15.9984 8.42905 16.0001 6.09795V5.95795L9.00008 2.01795Z"
                        fill="#6366F1"
                      />
                    </svg>
                    <span>attributes</span>
                  </span>
                  <div class="flex">
                    <div
                      v-if="openCollectionToken.metadata"
                      v-for="attribute in openCollectionToken.metadata
                        .attributes"
                      class="flex flex-col bg-zinc-900 mx-1 px-3 py-2 rounded-2xl justify-between"
                    >
                      <span class="flex flex-col">
                        <span class="text-xs">{{ attribute.trait_type }}</span>
                        <span class="text-sm font-cal">{{
                          attribute.value
                        }}</span>
                      </span>
                      <!--
                      <span
                        class="text-xs bg-indigo-200 text-indigo-500 w-fit font-extrabold py-1 px-2 rounded-2xl mt-1"
                      >
                        12%
                      </span>
                    --></div>
                  </div>
                </template>
                <div v-else class="mt-4 text-center">attributes not found</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-white font-josefin text-lg">
          <div class="mt-4" v-if="listingPriceInput">
            <p class="font-josefin mr-2 text-sm">Listing price:</p>
            <div class="mb-2 flex bg-zinc-900 rounded-2xl w-full min-w-[6rem]">
              <img draggable="false" :src="denomLogo" class="w-4 mx-4 my-2" />
              <code
                class="flex-1 bg-zinc-900 w-full min-w-[6rem] pr-4 py-2 rounded-2xl flex"
              >
                <input
                  class="bg-zinc-900 w-full focus:outline-none py-1 text-sm"
                  type="number"
                  v-model="listingPrice"
                  :placeholder="`${minimumListingPrice}`"
                  :min="minimumListingPrice"
                />
              </code>
            </div>
            <div class="mt-4 flex mb-4 justify-between">
              <p class="font-josefin mr-2 text-sm">Open on offers:</p>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="openOnOffers"
                />
                <div
                  class="w-11 h-6 bg-zinc-700 rounded-full peer peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"
                ></div>
              </label>
            </div>
          </div>
          <button
            class="w-full bg-indigo-500 p-2 rounded-full my-1 hover:bg-indigo-700 ease-out duration-300 disabled:bg-indigo-700"
            :disabled="listingInProgress"
            @click="listNFT"
          >
            {{ listingInProgress ? 'listing in progress...' : 'list' }}
          </button>
          <div class="text-center">or</div>
          <code
            v-if="addressInput"
            class="flex-1 bg-zinc-900 w-full min-w-[6rem] px-4 py-2 rounded-2xl my-2 flex"
          >
            <input
              class="bg-zinc-900 w-full focus:outline-none py-1.5 text-xs"
              type="text"
              v-model="sendToAddress"
              id="rangenumber"
              placeholder="archway..."
              maxlength="46"
            />
          </code>

          <button
            @click="sendNFT"
            class="w-full ease-out duration-300 bg-transparent p-2 my-1 border-white text-white disabled:border-zinc-300 border-4 rounded-full disabled:text-zinc-300 hover:text-indigo-500 hover:border-indigo-500"
          >
            {{ sendingInProgress ? 'sending in progress...' : 'send' }}
          </button>

          <div class="mt-2 text-sm">buy NFT or make a reseller offer</div>
          <p
            class="text-center font-josefin text-sm my-2 text-indigo-500 hover:text-indigo-400 ease-out duration-300"
            @click="openToken = false"
          >
            back to collection >
          </p>
        </div>
      </div>
    </ProductsCart>
  </div>
  <div class="grid" v-if="collectionAddress">
    <div>
      <Button
        content="back"
        arrow="left"
        color="black"
        class="mb-4 float-right ml-auto w-fit h-fit"
        @click="back()"
      />
    </div>
    <div
      v-if="currentCollectionData"
      class="w-full bg-black grid lg:flex text-white py-16 px-12 rounded-2xl"
    >
      <img
        draggable="false"
        class="w-36 m-auto"
        :src="
          currentCollectionData.thumbnail
            ? currentCollectionData.thumbnail
            : 'evolvnft-collection-logo.svg'
        "
      />
      <div class="lg:ml-8 lg:max-w-[20rem] flex-1">
        <h2 class="font-cal text-2xl mt-4 lg:mt-1">
          {{ currentCollectionData.name }}
        </h2>
        <h3 class="font-josefin font-semibold mb-3">
          {{ currentCollectionData.symbol }}
        </h3>
        <div class="grid font-josefin text-xs w-full gap-[5px]">
          <div
            v-if="currentCollectionData.limit"
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
          >
            <span class="flex-1">supply</span>
            <span>{{ currentCollectionData.limit }}</span>
          </div>
          <div class="bg-zinc-900 px-4 py-2 rounded-full flex items-center">
            <span class="flex-1">owned tokens</span>
            <span>{{ currentCollectionTokens?.length }}</span>
          </div>
          <div
            v-if="currentCollectionData.rewards_percentage_fee"
            class="bg-zinc-900 px-4 py-2 rounded-full flex items-center"
          >
            <span class="flex-1">rewards</span>
            <span
              >{{ currentCollectionData.rewards_percentage_fee / 100 }} %</span
            >
          </div>
        </div>
      </div>
      <div class="flex-1">
        <p class="my-8 lg:mx-8 font-josefin text-sm float-left">
          {{ currentCollectionData.description }}
        </p>
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-y-2 mt-4 xl:mt-20">
      <OfferBox
        v-if="currentCollectionTokens"
        v-for="tokenData in currentCollectionTokens"
        :tokenId="tokenData.tokenId"
        :collection="collectionAddress"
        :metadata="tokenData.metadata"
        class="drop-shadow-2xl"
        :marketplace="false"
        @click="toogleOpen(tokenData)"
      />
    </div>
  </div>
  <CollectionsList
    v-else
    v-if="userCollections.length > 0"
    :collections="userCollections"
    @collectionDetails="(address: string) => openCollection(address)"
  />
</template>

<script lang="ts">
import {
  getCollection,
  getOwnedTokens,
  listToken,
  sendToken,
} from '../utils/evolve';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import type { UserCollection } from '../utils/types/UserCollections';
import { getArchwaySigner } from '../utils/wallet';
import CollectionsList from './CollectionsList.vue';
import OfferBox from './OfferBox.vue';
import CollectionBaner from './CollectionBaner.vue';
import Button from './Button.vue';
import CollectionMarketplaceHeader from './CollectionMarketplaceHeader.vue';
import ProductsCart from './ProductsCart.vue';
import { walletSignerAddress } from '../state/walletState';
import { useStore } from '@nanostores/vue';
import { computed } from 'vue';
import { archToAarch, shortenArchAddress, toFixed } from '../utils/arch';
import {
  BLOCKCHAIN_SCAN_ACCOUNT,
  MINIMUM_LISTING_PRICE,
  NETWORK_INFO,
} from '../utils/constant';
import { errorMessage } from '../state/error';
import { getMetadata } from '../utils/utils';

export default {
  components: {
    CollectionsList,
    OfferBox,
    CollectionBaner,
    Button,
    CollectionMarketplaceHeader,
    ProductsCart,
  },
  data() {
    return {
      userCollections: [] as CollectionEntitie[],
      userCollectionsAndTokens: [] as UserCollection[],
      collectionAddress: undefined as string | undefined,
      currentCollectionTokens: undefined as
        | undefined
        | {
            metadata: any;
            owner: string;
            approvals: any;
            token_uri: string;
            extension: any;
            tokenId: string;
          }[],
      currentCollectionData: undefined as undefined | CollectionEntitie,
      paginator: 5,
      openToken: false,
      openCollectionToken: undefined as
        | undefined
        | {
            metadata: any;
            owner: string;
            approvals: any;
            token_uri: string;
            extension: any;
            tokenId: string;
          },
      openTokenSubPage: 'details',
      listingInProgress: false,
      sendingInProgress: false,
      addressInput: false,
      sendToAddress: undefined as undefined | string,
      listingPriceInput: false,
      listingPrice: undefined as undefined | number,
      openOnOffers: true,
    };
  },
  props: {
    denomLogo: {
      type: String,
      default: () => 'arch-logo.svg',
    },
  },
  methods: {
    async listNFT() {
      if (this.collectionAddress && this.openCollectionToken) {
        if (this.listingPriceInput && this.listingPrice) {
          if (this.listingPrice < MINIMUM_LISTING_PRICE) {
            throw errorMessage.set(
              `Minimul listing price is: ${toFixed(MINIMUM_LISTING_PRICE)}${
                NETWORK_INFO.stakeCurrency.coinDenom
              }`,
            );
          }
          this.listingInProgress = true;
          await listToken(
            this.collectionAddress,
            this.openCollectionToken.tokenId,
            archToAarch(this.listingPrice),
            NETWORK_INFO.stakeCurrency.coinMinimalDenom,
            this.openOnOffers,
          );
          this.listingInProgress = false;
          this.toogleOpen();
        } else {
          this.listingPriceInput = true;
        }
      }
    },
    async sendNFT() {
      if (
        this.addressInput &&
        this.collectionAddress &&
        this.openCollectionToken
      ) {
        if (
          this.sendToAddress === undefined ||
          this.sendToAddress.length < 46
        ) {
          throw errorMessage.set(`Receiver address is not valid`);
        }
        this.sendingInProgress = true;
        await sendToken(
          this.collectionAddress,
          this.openCollectionToken.tokenId,
          this.sendToAddress,
        );
        this.sendingInProgress = false;
      } else {
        this.addressInput = true;
      }
    },
    async toogleOpen(collectionToken?: {
      metadata: any;
      owner: string;
      approvals: any;
      token_uri: string;
      extension: any;
      tokenId: string;
    }) {
      if (this.openToken) {
        this.openCollectionToken = undefined;
        const body = document.querySelector('body');
        body && (body.style.overflow = 'auto');
      } else {
        if (collectionToken) {
          this.openCollectionToken = collectionToken;
          const body = document.querySelector('body');
          body && (body.style.overflow = 'hidden');
        }
      }
      this.openToken = !this.openToken;
    },
    async loadOwnedTokens() {
      const { signerAddress } = await getArchwaySigner();

      let collectionsAddresses = await getOwnedTokens(signerAddress);
      this.userCollectionsAndTokens.push(...collectionsAddresses.collections);
      collectionsAddresses.collections.forEach((col) =>
        getCollection(col.address).then((res) =>
          this.userCollections?.push(res),
        ),
      );
      for (let index = 0; true; index++) {
        collectionsAddresses = await getOwnedTokens(signerAddress, index);
        this.userCollectionsAndTokens.push(...collectionsAddresses.collections);
        collectionsAddresses.collections.forEach((col) =>
          getCollection(col.address).then((res) => {
            this.userCollections?.push(res);
          }),
        );
        if (collectionsAddresses.collectionsScanned < 10) break;
      }
      this.userCollectionsAndTokens.forEach(col => {
        const collection = this.userCollections.find(tokens => tokens.address === col.address)
        if (collection) {
          collection.tokens = col.tokens
        }
      })
    },
    async loadCollectionTokens(colectionTokens?: {
      [key: string]: {
        owner: string;
        approvals: any;
        token_uri: string;
        extension: any;
      };
    }) {
      if (!colectionTokens) return;
      if (this.collectionAddress) {
        const metadataArray = await Promise.all(
          Object.values(colectionTokens).map((item) =>
            getMetadata(item.token_uri),
          ),
        );
        this.currentCollectionTokens = Object.keys(colectionTokens).map(
          (id, index) => ({
            ...colectionTokens[id],
            metadata: metadataArray[index],
            tokenId: id,
          }),
        );
        console.log({currentCollectionTokens: this.currentCollectionTokens})
      }
    },
    back() {
      this.currentCollectionTokens = undefined;
      this.collectionAddress = undefined;
      this.currentCollectionData = undefined;
    },
    async openCollection(address: string) {
      this.collectionAddress = address;
      const colectionTokens = this.userCollectionsAndTokens.find(
        (col) => col.address === this.collectionAddress,
      )?.tokens;
      await Promise.all([
        this.loadCollectionTokens(colectionTokens),
        getCollection(address).then(
          (res) => (this.currentCollectionData = res),
        ),
      ]);
    },
    blockchainScan() {
      return BLOCKCHAIN_SCAN_ACCOUNT;
    },
    shortenArchAddress,
  },
  computed: {
    minimumListingPrice: () => MINIMUM_LISTING_PRICE,
  },
  async mounted() {
    await this.loadOwnedTokens();
  },
  setup() {
    const $walletSignerAddress = useStore(walletSignerAddress);

    return {
      walletSignerAddress: computed(() => $walletSignerAddress.value),
    };
  },
};
</script>
