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
      <MyOfferBox
        v-if="tokenOffersMetadata"
        v-for="offer in userOffers"
        :offer="offer"
        :tokenImage="
          tokenOffersMetadata[offer.collection].tokens[offer.token_id].metadata
            ?.image || 'evolvnft-collection-logo.svg'
        "
        @cancelOffer="cancelOfferForToken"
      />
    </div>
    <div v-if="'on sale' === openTab">
      <MyListingBox
        v-if="tokenListingsMetadata"
        v-for="listing in userListings"
        :listing="listing"
        :tokenImage="
          tokenListingsMetadata[listing.collection].tokens[listing.token_id]
            .metadata?.image || 'evolvnft-collection-logo.svg'
        "
        @cancelOffer="closeNFTListing"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from '@nanostores/vue';
import { computed } from 'vue';
import { walletSignerAddress } from '../state/walletState';
import {
  cancelOffer,
  closeTokenListing,
  getAddressTokenListings,
  getAddressTokenOffers,
  getCollectionData,
} from '../utils/evolve';
import type { UserOffers } from '../utils/types/UserOffers';
import { aarchToArch, shortenArchAddress } from '../utils/arch';
import Button from '../components/Button.vue';
import MyListingBox from '../components/MyListingBox.vue';
import { isWallet } from '../utils/wallet';
import { getMetadata } from '../utils/utils';
import MyOfferBox from '../components/MyOfferBox.vue';
import type { UserListings } from '../utils/types/UserListings';
import type { CollectionTokensMetadata } from '../utils/types/CollectionTokensMetadata';
import { infoMessage } from '../state/error';

export default {
  components: { Button, MyOfferBox, MyListingBox },
  data() {
    return {
      openTab: 'offers' as 'offers' | 'on sale',
      userOffers: undefined as undefined | UserOffers[],
      userListings: undefined as undefined | UserListings[],
      tokenOffersMetadata: undefined as undefined | CollectionTokensMetadata,
      tokenListingsMetadata: undefined as undefined | CollectionTokensMetadata,
    };
  },
  props: {
    denomLogo: {
      type: String,
      default: () => '/arch-logo.svg',
    },
  },
  methods: {
    shortenArchAddress,
    aarchToArch,
    async cancelOfferForToken(collection: string, tokenId: string) {
      if (this.tokenOffersMetadata && this.userOffers) {
        await cancelOffer(collection, tokenId);
        this.userOffers = this.userOffers.filter(function (obj) {
          return obj.collection !== collection && obj.token_id !== tokenId;
        });
      }
    },
    async closeNFTListing(collection: string, tokenId: string) {
      if (collection && tokenId) {
        await closeTokenListing(collection, tokenId);
      }
    },
  },
  async setup() {
    const joinTokensAndCollections = async (
      userOffers: UserOffers[] | UserListings[],
    ) => {
      if (userOffers) {
        const collectionTokens: CollectionTokensMetadata = {};
        userOffers.forEach((offer) => {
          if (collectionTokens[offer.collection]) {
            collectionTokens[offer.collection]['tokens'][offer?.token_id] = {};
          } else {
            collectionTokens[offer.collection] = {
              ...collectionTokens[offer.collection],
              tokens: { [offer?.token_id]: {} },
            };
          }
        });

        const collectionAddresses = Object.keys(collectionTokens);
        const collectionPromise = collectionAddresses.map((collectionAddress) =>
          getCollectionData(collectionAddress),
        );
        const collectionsData = await Promise.all(collectionPromise);

        await Promise.all(
          collectionAddresses.map(async (collectionAddress, colIndex) => {
            collectionTokens[collectionAddress].collectionData =
              collectionsData[colIndex];

            const tokens =
              collectionTokens[collectionAddress].collectionData?.tokens;

            if (tokens) {
              await Promise.all(
                Object.keys(collectionTokens[collectionAddress].tokens).map(
                  async (tokenId) => {
                    const tokenMetadataUri =
                      tokens[Number(tokenId) - 1]?.token_uri;

                    collectionTokens[collectionAddress].tokens[
                      tokenId
                    ].metadataUrl = tokenMetadataUri;

                    collectionTokens[collectionAddress].tokens[
                      tokenId
                    ].metadata = await getMetadata(tokenMetadataUri);
                  },
                ),
              );
            }
          }),
        );

        return collectionTokens;
      }
    };

    isWallet();
    const $walletSignerAddress = useStore(walletSignerAddress);

    if (!$walletSignerAddress.value) return {};

    infoMessage.set('Syncing your market data');
    const [userOffers, userListings] = await Promise.all([
      getAddressTokenOffers($walletSignerAddress.value),
      getAddressTokenListings($walletSignerAddress.value),
    ]);

    const [tokenOffersMetadata, tokenListingsMetadata] = await Promise.all([
      joinTokensAndCollections(userOffers),
      joinTokensAndCollections(userListings),
    ]);
    infoMessage.set('Your market data are up to date');

    return {
      walletSignerAddress: computed(() => $walletSignerAddress.value),
      userOffers: computed(() => userOffers),
      userListings: computed(() => userListings),
      tokenOffersMetadata: computed(() => tokenOffersMetadata),
      tokenListingsMetadata: computed(() => tokenListingsMetadata),
    };
  },
};
</script>
