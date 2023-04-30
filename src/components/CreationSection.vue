<template>
  <div>
    <CollectionSection v-if="step === 0" @next="nextStep" />
    <CollectionBuilder
      v-if="step > 0 && step <= 7"
      @next="nextStep"
      @back="previousStep"
      @acceptFiles="(files: Array<any>) => updateCollectionLogo(files)"
      :step="step"
    />
  </div>
</template>

<script lang="ts">
import CollectionSection from "./CollectionSection.vue";
import CollectionBuilder from "./CollectionBuilder.vue";
import { computed, reactive } from "vue";
import { useStore } from "@nanostores/vue";
import {
  collectionDescription,
  collectionEvolvMetadata,
  collectionImg,
  collectionSymbol,
  collectionTitle,
  isColectionClosed,
  tokenLimit,
} from "../state/collectionState";
import type { Window as KeplrWindow } from "@keplr-wallet/types";
import {
  CONSTANTINE_INFO,
  CONTRACT_ADDRESS,
  DEFAULT_SIGNING_CLIENT_OPTIONS,
} from "../utils/constant";
import {
  SigningArchwayClient,
} from "@archwayhq/arch3.js";
import { createEvolveCollection } from "../utils/evolve";
import { uploadBlob } from "../utils/bundlrUploader";

declare global {
  interface Window extends KeplrWindow {}
}

export default {
  data() {
    return {
      step: 0,
      acceptFiles: [] as Array<any>,
    };
  },
  components: {
    CollectionSection,
    CollectionBuilder,
  },

  methods: {
    async uploadImage() {
      const firstFile = this.acceptFiles[0] as unknown as any;
      if (!firstFile) return console.error("Failed to upload image");
      const imageId = await uploadBlob(firstFile, firstFile.type);
      if (!imageId) return console.error("Failed to upload image");
      return `https://arweave.net/${imageId}`;
    },

    async createCollection() {
      const arweaveUrl = await this.uploadImage();
      if (!arweaveUrl) {
        return console.error("Failed to upload image");
      }
      collectionImg.set(arweaveUrl);

      const offlineSigner = window.keplr?.getOfflineSigner(
        CONSTANTINE_INFO.chainId
      );
      if (!offlineSigner) {
        return console.error("Failed to create offline signer");
      }
      const accounts = await offlineSigner.getAccounts();
      const cosmSigner = await SigningArchwayClient.connectWithSigner(
        CONSTANTINE_INFO.rpc,
        offlineSigner,
        {
          ...DEFAULT_SIGNING_CLIENT_OPTIONS,
          prefix: CONSTANTINE_INFO.stakeCurrency.coinDenom,
        }
      );
      let ic_collection_id: null| number = null;
      if (this.collectionEvolvMetadataValue){
        ic_collection_id = await createEvolveCollection(accounts[0].address)
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

      const { transactionHash } = await cosmSigner.execute(
        accounts[0].address,
        CONTRACT_ADDRESS,
        { register_collection },
        "auto"
      );
      console.log(`https://testnet.mintscan.io/archway-testnet/txs/${transactionHash}`)
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
    nextStep() {
      this.step++;
      if (this.step === 7) {
        this.createCollection()
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
      collectionEvolvMetadataValue: computed(() => $collectionEvolvMetadata.value),
    };
  },
};
</script>
