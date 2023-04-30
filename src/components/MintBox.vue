<template>
  <div class="mx-auto">
    <div
      class="bg-black w-[20rem] sm:w-[28rem] md:w-[38rem] lg:w-[46rem] float-left p-8 sm:p-12 md:p-14 rounded-[3rem]"
    >
      <div class="w-full float-left flex items-center">
        <img class="w-14 sm:w-20" src="/mint-white.svg" />
        <h2
          class="float-left ml-2 text-3xl sm:text-4xl font-cal text-white flex-auto"
        >
          mint NFTs!
        </h2>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="self-start cursor-pointer fill-white hover:fill-indigo-500 ease-out duration-200"
          @click="$emit('close')"
        >
          <path
            d="M23.4684 0.549793C23.3 0.381037 23.1 0.247152 22.8798 0.155803C22.6595 0.0644534 22.4234 0.0174325 22.185 0.0174325C21.9467 0.0174325 21.7105 0.0644534 21.4903 0.155803C21.2701 0.247152 21.0701 0.381037 20.9017 0.549793L12 9.43326L3.09833 0.531589C2.9298 0.363054 2.72971 0.229366 2.50951 0.138155C2.28931 0.0469448 2.05331 1.7758e-09 1.81496 0C1.57662 -1.7758e-09 1.3406 0.0469448 1.1204 0.138155C0.900203 0.229366 0.700123 0.363054 0.531589 0.531589C0.363054 0.700123 0.229366 0.900203 0.138155 1.1204C0.0469448 1.3406 -1.7758e-09 1.57662 0 1.81496C1.7758e-09 2.05331 0.0469448 2.28931 0.138155 2.50951C0.229366 2.72971 0.363054 2.9298 0.531589 3.09833L9.43326 12L0.531589 20.9017C0.363054 21.0702 0.229366 21.2702 0.138155 21.4904C0.0469448 21.7106 0 21.9467 0 22.185C0 22.4234 0.0469448 22.6594 0.138155 22.8796C0.229366 23.0998 0.363054 23.2999 0.531589 23.4684C0.700123 23.637 0.900203 23.7707 1.1204 23.8619C1.3406 23.9531 1.57662 24 1.81496 24C2.05331 24 2.28931 23.9531 2.50951 23.8619C2.72971 23.7707 2.9298 23.637 3.09833 23.4684L12 14.5667L20.9017 23.4684C21.0702 23.637 21.2702 23.7707 21.4904 23.8619C21.7106 23.9531 21.9467 24 22.185 24C22.4234 24 22.6594 23.9531 22.8796 23.8619C23.0998 23.7707 23.2999 23.637 23.4684 23.4684C23.637 23.2999 23.7707 23.0998 23.8619 22.8796C23.9531 22.6594 24 22.4234 24 22.185C24 21.9467 23.9531 21.7106 23.8619 21.4904C23.7707 21.2702 23.637 21.0702 23.4684 20.9017L14.5667 12L23.4684 3.09833C24.1602 2.40659 24.1602 1.24154 23.4684 0.549793Z"
          />
        </svg>
      </div>
      <p
        class="w-full float-left :text-xl xl:text-2xl font-josefin text-zinc-300 mt-8"
      >
        For mint tokens, drop the token metadata along with the token image. In
        order for images to be linked to metadata correctly, name the metadata
        the same as the image (for example: 1.json, 1.png).
      </p>
      <Uploader
        class="float-left mt-8 w-full"
        heading="drop files below:"
        :acceptedTypes="acceptedTypes"
        @acceptFiles="(acceptFiles: any[]) => joinMetadata(acceptFiles)"
      />
      <div
        class="float-left w-full mt-4 h-24 overflow-auto"
        v-if="filesToUpload && Object.keys(filesToUpload).length > 0"
      >
        <span
          v-for="(files, key) in filesToUpload"
          class="text-white float-left w-full flex items-center"
        >
          <p class="float-left">{{ key }}</p>
          <span v-if="files.image && files.metadata" class="ml-1 float-left">
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4"
            >
              <path
                d="M2 9.71429L7.14286 14.8571L20 2"
                stroke="#22C55E"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span v-else class="ml-1 float-left">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4"
            >
              <path
                d="M15.6456 0.366529C15.5334 0.254025 15.4 0.164768 15.2532 0.103869C15.1063 0.042969 14.949 0.0116217 14.79 0.0116217C14.6311 0.0116217 14.4737 0.042969 14.3269 0.103869C14.1801 0.164768 14.0467 0.254025 13.9345 0.366529L8 6.28884L2.06555 0.354393C1.9532 0.242036 1.81981 0.15291 1.67301 0.0921032C1.52621 0.0312966 1.36887 1.18386e-09 1.20998 0C1.05108 -1.18386e-09 0.893736 0.0312966 0.746936 0.0921032C0.600135 0.15291 0.466749 0.242036 0.354393 0.354393C0.242036 0.466749 0.15291 0.600135 0.0921032 0.746936C0.0312966 0.893736 -1.18386e-09 1.05108 0 1.20998C1.18386e-09 1.36887 0.0312966 1.52621 0.0921032 1.67301C0.15291 1.81981 0.242036 1.9532 0.354393 2.06555L6.28884 8L0.354393 13.9345C0.242036 14.0468 0.15291 14.1802 0.0921032 14.327C0.0312966 14.4738 0 14.6311 0 14.79C0 14.949 0.0312966 15.1062 0.0921032 15.253C0.15291 15.3998 0.242036 15.5333 0.354393 15.6456C0.466749 15.758 0.600135 15.8471 0.746936 15.9079C0.893736 15.9687 1.05108 16 1.20998 16C1.36887 16 1.52621 15.9687 1.67301 15.9079C1.81981 15.8471 1.9532 15.758 2.06555 15.6456L8 9.71112L13.9345 15.6456C14.0468 15.758 14.1802 15.8471 14.327 15.9079C14.4738 15.9687 14.6311 16 14.79 16C14.949 16 15.1062 15.9687 15.253 15.9079C15.3998 15.8471 15.5333 15.758 15.6456 15.6456C15.758 15.5333 15.8471 15.3998 15.9079 15.253C15.9687 15.1062 16 14.949 16 14.79C16 14.6311 15.9687 14.4738 15.9079 14.327C15.8471 14.1802 15.758 14.0468 15.6456 13.9345L9.71112 8L15.6456 2.06555C16.1068 1.60439 16.1068 0.827696 15.6456 0.366529Z"
                fill="#EF4444"
              />
            </svg>
          </span>
        </span>
      </div>
      <Button
        class="float-right mt-8"
        :content="mintingnProgress ? 'uploading...' : 'mint NFTs'"
        :isDisabled="
          (!(Object.keys(filesToUpload).length > 0) && !mintingnProgress) ||
          mintingnProgress
        "
        @click="mintNFTs()"
        :state="
          mintingnProgress
            ? 'progress'
            : !(Object.keys(filesToUpload).length > 0)
            ? 'notAllowed'
            : 'allowed'
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@nanostores/vue";
import { errorMessage, isErrorPopout } from "../state/error";
import { computed } from "vue";
import Uploader from "./Uploader.vue";
import Button from "./Button.vue";
import {
  CONSTANTINE_INFO,
  CONTRACT_ADDRESS,
  DEFAULT_SIGNING_CLIENT_OPTIONS,
} from "../utils/constant";
import { SigningArchwayClient } from "@archwayhq/arch3.js/build";
import {
  buildMintObject,
  joinMetadataAndImages,
  uploadTokenMetadata,
} from "../utils/metadata";
import type { CollectionEntitie } from "../utils/types/CollectionItem";

export default {
  emit: ["close", "afterMint"],
  data() {
    const imgTypes = ["image/jpeg", "image/png", "image/gif"];
    const jsonTypes = ["application/json"];
    return {
      mintingnProgress: false,
      jsonTypes,
      imgTypes,
      acceptedTypes: [...imgTypes, ...jsonTypes],
      filesToUpload: {} as { [key: string]: { image?: any; metadata?: any } },
    };
  },
  components: {
    Uploader,
    Button,
  },
  props: {
    collectionAddress: {
      type: String,
      required: true,
    },
    close: {
      type: Function,
    },
    afterMint: {
      type: Promise,
    },
    collection: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async mintNFTs() {
      this.mintingnProgress = true;
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
      const tokens = await buildMintObject(
        accounts[0].address,
        this.filesToUpload,
        this.collection as CollectionEntitie
      );
      if (!tokens) return console.error("Failed to mint NFTs");
      const mint_tokens = {
        address: this.collectionAddress,
        tokens,
      };
      const { transactionHash } = await cosmSigner.execute(
        accounts[0].address,
        CONTRACT_ADDRESS,
        { mint_tokens },
        "auto"
      );
      console.log(
        `https://testnet.mintscan.io/archway-testnet/txs/${transactionHash}`
      );
      this.$emit("afterMint");
      this.filesToUpload = {};
      this.mintingnProgress = false;
    },
    joinMetadata(acceptFiles: any[]) {
      this.filesToUpload = joinMetadataAndImages(
        acceptFiles,
        this.imgTypes,
        this.jsonTypes
      );
    },
  },
  setup() {
    const $isErrorPopout = useStore(isErrorPopout);
    const $errorMessage = useStore(errorMessage);

    return {
      isErrorPopoutValue: computed(() => $isErrorPopout.value),
      errorMessageValue: computed(() => $errorMessage.value),
    };
  },
};
</script>
