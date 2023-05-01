<template>
  <div
    class="bg-black p-8 sm:p-12 w-72 sm:min-w-[30rem] md:w-[40rem] lg:w-auto lg:p-16 rounded-[3rem] xl:min-h-[32rem] flex-col float-left"
  >
    <div class="lg:flex lg:flex-row">
      <div class="lg:max-w-[20rem] lg:mr-16">
        <img
          class="w-48 mx-auto"
          :src="metadata ? metadata.image : '/evolvnft-collection-logo.svg'"
          draggable="false"
        />
        <div class="text-white">
          <p class="text-zinc-400 font-josefin text-xs">Token name:</p>
          <h1 class="text-3xl font-cal">
            {{ metadata ? metadata.name : "Loading metadata..." }}
          </h1>
          <p class="text-zinc-400 font-josefin text-xs mt-1">Owner:</p>
          <p class="text-zinc-200 font-josefin">
            {{ owner.slice(0, 11) }}...{{
              owner.slice(owner.length - 6, owner.length)
            }}
          </p>
          <p class="text-zinc-400 font-josefin text-xs mt-1">Description:</p>
          <p class="text-md font-josefin">
            {{ metadata ? metadata.description : "Loading metadata..." }}
          </p>
          <Uploader
            v-if="evolv"
            class="mt-8 w-full"
            heading="drop new metadata:"
            :acceptedTypes="acceptedTypes"
            :maxFiles="2"
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
              <span
                v-if="files.image && files.metadata"
                class="ml-1 float-left"
              >
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
        </div>
      </div>
      <div
        class="bg-zinc-900 p-4 rounded-2xl w-auto overflow-auto h-full max-h-[25rem] lg:max-h-[35rem] lg:w-[35rem] mt-8"
      >
        <code class="text-white">
          <pre>{{
            metadata
              ? JSON.stringify(metadata, null, " ")
              : "Loading metadata..."
          }}</pre>
        </code>
      </div>
    </div>
    <div class="flex-auto w-full pt-4">
      <span class="float-right">
        <Button
          :content="evolvInProgress ? 'evolving...' : 'evolv metadata!'"
          :evolv="true"
          :isDisabled="
            (!(Object.keys(filesToUpload).length > 0) && !evolvInProgress) ||
            evolvInProgress
          "
          @click="
            !evolvInProgress &&
              Object.keys(filesToUpload).length === 1 &&
              editMetadata()
          "
          :state="
            evolvInProgress
              ? 'progress'
              : !(Object.keys(filesToUpload).length > 0)
              ? 'notAllowed'
              : 'allowed'
          "
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Uploader from "./Uploader.vue";
import Button from "./Button.vue";
import { editEvolveMetadata } from "../utils/evolve";
import { CONSTANTINE_INFO } from "../utils/constant";
import { joinMetadataAndImages } from "../utils/metadata";
import { uploadBlob } from "../utils/bundlrUploader";

export default {
  data() {
    const imgTypes = ["image/jpeg", "image/png", "image/gif"];
    const jsonTypes = ["application/json"];
    return {
      evolvInProgress: false,
      metadata: undefined as any,
      jsonTypes,
      imgTypes,
      acceptedTypes: [...imgTypes, ...jsonTypes],
      filesToUpload: {} as { [key: string]: { image?: any; metadata?: any } },
      acceptedFiles: undefined,
    };
  },
  components: {
    Uploader,
    Button,
  },

  props: {
    selectedMetadata: {
      type: Object,
      default: {},
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    tokenUri: {
      type: String,
      required: true,
    },
    selectedToken: {
      type: Object,
      default: {},
      required: true,
    },
    evolv: {
      type: Number,
      required: false,
    },
  },
  methods: {
    joinMetadata(acceptFiles: any[]) {
      this.filesToUpload = joinMetadataAndImages(
        acceptFiles,
        this.imgTypes,
        this.jsonTypes
      );
    },
    async getMetadata(url: string) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    async editMetadata() {
      this.evolvInProgress = true;
      for (const fileName in this.filesToUpload) {
        if (
          !this.filesToUpload[fileName].image &&
          !this.filesToUpload[fileName].metadata
        ) {
          console.error("No file selected");
        }
        const metadataUrl = new URL(this.selectedToken.token_uri);
        const splitedPath = metadataUrl.pathname.split("/");
        const metadataId = Number(splitedPath[splitedPath.length - 1]);
        if (this.evolv && metadataId) {
          const offlineSigner = window.keplr?.getOfflineSigner(
            CONSTANTINE_INFO.chainId
          );
          if (!offlineSigner) {
            return console.error("Failed to create offline signer");
          }
          const accounts = await offlineSigner.getAccounts();

          const imageUploadId = await uploadBlob(
            this.filesToUpload[fileName].image,
            this.filesToUpload[fileName].image.type
          );
          if (!imageUploadId) return console.error("Failed to upload image");
          const metadata = await this.filesToUpload[fileName].metadata.text();
          const parsedMetadata = JSON.parse(metadata);
          parsedMetadata.image = `https://arweave.net/${imageUploadId}`;
          const encodedMetadata = new Blob([JSON.stringify(parsedMetadata)]);
          const metadataUploadId = await uploadBlob(
            encodedMetadata,
            "application/json"
          );
          if (!metadataUploadId)
            return console.error("Failed to upload metadata");

          await editEvolveMetadata(
            accounts[0].address,
            this.evolv,
            metadataId,
            metadataUploadId
          );
          this.metadata = await this.getMetadata(this.tokenUri);
          console.log("Metadata updated");
          this.evolvInProgress = false;
          this.filesToUpload = {};
        }
      }
    },
  },
  async mounted() {
    this.metadata = await this.getMetadata(this.tokenUri);
  },
  watch: {
    tokenUri: async function (newVal) {
      if (Object.keys(this.selectedMetadata).length === 0) {
        this.metadata = await this.getMetadata(newVal);
      }
    },
    selectedMetadata: function (newVal) {
      this.metadata = newVal;
    },
  },
};
</script>
