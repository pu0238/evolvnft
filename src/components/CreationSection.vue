<template>
  <div>
    <CollectionSection v-if="step === 0" @next="nextStep" />
    <CollectionBuilder
      v-if="step > 0 && step <= 7"
      @next="nextStep"
      @back="previousStep"
      @acceptFiles="(files: Array<any>) => updateCollectionLogo(files)"
      :step="step"
      :buildingCollection="buildingCollection"
    />
  </div>
</template>

<script lang="ts">
import CollectionSection from './CollectionSection.vue';
import CollectionBuilder from './CollectionBuilder.vue';
import { computed, reactive } from 'vue';
import { useStore } from '@nanostores/vue';
import {
  collectionDescription,
  collectionEvolvMetadata,
  collectionImg,
  collectionSymbol,
  collectionTitle,
  isColectionClosed,
  tokenLimit,
} from '../state/collectionState';
import type { Window as KeplrWindow } from '@keplr-wallet/types';
import {
  COLLECTION_MANAGER_CONTRACT_ADDRESS,
} from '../utils/constant';
import { createEvolveCollection } from '../utils/evolve';
import { uploadBlob } from '../utils/bundlrUploader';
import { getArchwaySigner } from '../utils/wallet';

declare global {
  interface Window extends KeplrWindow {}
}

export default {
  data() {
    return {
      step: 0,
      acceptFiles: [] as Array<any>,
      buildingCollection: false,
    };
  },
  components: {
    CollectionSection,
    CollectionBuilder,
  },

  methods: {
    async uploadImage() {
      const firstFile = this.acceptFiles[0] as unknown as any;
      if (!firstFile) return console.error('Failed to upload image');
      const imageId = await uploadBlob(firstFile, firstFile.type);
      if (!imageId) return console.error('Failed to upload image');
      return `https://arweave.net/${imageId}`;
    },

    async createCollection() {
      const arweaveUrl = await this.uploadImage();
      if (!arweaveUrl) {
        return console.error('Failed to upload image');
      }
      collectionImg.set(arweaveUrl);

      const { signerAddress, archwaySigner} = await getArchwaySigner()
      let ic_collection_id: null | number = null;
      if (this.collectionEvolvMetadataValue) {
        ic_collection_id = await createEvolveCollection(signerAddress);
      }

      const register_collection = {
        name: this.collectionTitleValue,
        description: this.collectionDescriptionValue,
        symbol: this.collectionSymbolValue,
        thumbnail: arweaveUrl,
        open: !this.isColectionClosedValue,
        limit: this.isColectionClosedValue ? Number(this.tokenLimitValue) : 0,
        ic_collection_id,
      };

      const { transactionHash } = await archwaySigner.execute(
        signerAddress,
        COLLECTION_MANAGER_CONTRACT_ADDRESS,
        { register_collection },
        'auto',
      );
      console.log(
        `https://testnet.mintscan.io/archway-testnet/txs/${transactionHash}`,
      );
    },

    updateCollectionLogo(files: Array<any>) {
      this.acceptFiles = files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const base64data = reader.result?.toString();
        base64data && collectionImg.set(base64data);
      };
    },
    async nextStep() {
      if (this.buildingCollection) return;
      this.step++;
      if (this.step === 7) {
        this.buildingCollection = true;
        await this.createCollection();
        this.buildingCollection = false;
      }
    },
    previousStep() {
      this.step--;
    },
  },
  setup(props) {
    props = reactive(props);
    const $isColectionClosed = useStore(isColectionClosed);
    const $tokenLimit = useStore(tokenLimit);
    const $collectionImg = useStore(collectionImg);
    const $collectionTitle = useStore(collectionTitle);
    const $collectionSymbol = useStore(collectionSymbol);
    const $collectionDescription = useStore(collectionDescription);
    const $collectionEvolvMetadata = useStore(collectionEvolvMetadata);

    return {
      isColectionClosedValue: computed(() => $isColectionClosed.value),
      tokenLimitValue: computed(() => $tokenLimit.value),
      collectionImgValue: computed(() => $collectionImg.value),
      collectionTitleValue: computed(() => $collectionTitle.value),
      collectionSymbolValue: computed(() => $collectionSymbol.value),
      collectionDescriptionValue: computed(() => $collectionDescription.value),
      collectionEvolvMetadataValue: computed(
        () => $collectionEvolvMetadata.value,
      ),
    };
  },
};
</script>
