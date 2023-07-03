<template>
  <BlackExpandable title="mint NFT">
    <div class="mx-4 my-6 grid">
      <p class="font-josefin font-normal text-sm">
        Here you can pre-mint some tokens to your collection. They will
        immediately get transferred to your wallet. Preminted tokens count
        towards your collection's total supply and they will NOT be available
        for use in launchpad.
        <a
          href="https://docs.opensea.io/docs/metadata-standards"
          class="text-indigo-500 font-semibold"
          target="_blank"
          >opensea metadata standard.</a
        >
      </p>
      <div class="mt-4 flex justify-end">
        <p class="font-josefin font-normal text-sm mr-2">Advance mode:</p>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            v-model="advanceMode"
          />
          <div
            class="w-11 h-6 bg-zinc-700 rounded-full peer peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"
          ></div>
        </label>
      </div>
      <div v-if="advanceMode" class="grid">
        <div class="mt-8 h-44 mb-10">
          <Uploader
            heading="drop files below:"
            :acceptedTypes="[...imgTypes, ...jsonTypes]"
            @acceptFiles="(acceptFiles: any[]) => advanceDrop(acceptFiles)"
          />
        </div>
        <div
          class="ml-2 max-h-24 overflow-auto"
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
        <span class="text-xs font-josefin mt-2"
          >In the advanced version, you should drop the paired metadata along
          with the assigned images. For the pairing procedure to run correctly,
          the images must have the same name as the metadata. For example:
          "1.gif", "1.json". You can drop multiple files here.</span
        >
      </div>
      <div v-else class="grid">
        <div class="w-full mb-8 grid lg:flex">
          <div class="w-48 h-48 mx-auto relative">
            <svg
              class="absolute -right-3 top-5"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="clearImage"
              v-if="singleImage && imageBase64"
            >
              <circle
                cx="16"
                cy="16"
                r="14.5"
                fill="white"
                stroke="#6366F1"
                stroke-width="3"
              />
              <path
                d="M15 8C13.9 8 13 8.84375 13 9.875H11C9.9 9.875 9 10.7187 9 11.75H23C23 10.7187 22.1 9.875 21 9.875H19C19 8.84375 18.1 8 17 8H15ZM11 13.625V22.6437C11 22.85 11.16 23 11.38 23H20.64C20.86 23 21.02 22.85 21.02 22.6437V13.625H19.02V20.1875C19.02 20.7125 18.58 21.125 18.02 21.125C17.46 21.125 17.02 20.7125 17.02 20.1875V13.625H15.02V20.1875C15.02 20.7125 14.58 21.125 14.02 21.125C13.46 21.125 13.02 20.7125 13.02 20.1875V13.625H11.02H11Z"
                fill="#6366F1"
              />
            </svg>
            <img
              alt="NFT image"
              class="w-48 h-48 mt-8"
              :src="imageBase64"
              v-if="singleImage && imageBase64"
            />
            <Uploader
              v-else
              class="mt-8"
              dropboxText="drag image here!"
              dropboxText2="PNG, JPG or GIF (max 100kb)"
              heading=""
              :isSquare="true"
              :acceptedTypes="imgTypes"
              @acceptFiles="(acceptFiles: any[]) => dropImage(acceptFiles)"
            />
          </div>
          <div
            class="h-48 flex-1 lg:ml-8 mt-4 lg:mt-0 relative"
            v-if="!generateMetadata"
          >
            <div
              class="bg-zinc-900 p-4 rounded-2xl relative overflow-y-auto h-full mt-8 text-xs overflow-x-hidden w-full"
              v-if="singleMetadata"
            >
              <code class="text-white absolute">
                <pre>{{
                  singleMetadata ? parsedJSON : 'Loading metadata...'
                }}</pre>
              </code>
            </div>
            <Uploader
              v-else
              class="mt-8"
              dropboxText="drag metadata here!"
              dropboxText2="JSON (max 100kb)"
              heading=""
              :acceptedTypes="jsonTypes"
              @acceptFiles="(acceptFiles: any[]) => dropMetadata(acceptFiles)"
            />
            <svg
              class="absolute -right-3 top-5"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="clearMetadata"
              v-if="singleMetadata && parsedJSON"
            >
              <circle
                cx="16"
                cy="16"
                r="14.5"
                fill="white"
                stroke="#6366F1"
                stroke-width="3"
              />
              <path
                d="M15 8C13.9 8 13 8.84375 13 9.875H11C9.9 9.875 9 10.7187 9 11.75H23C23 10.7187 22.1 9.875 21 9.875H19C19 8.84375 18.1 8 17 8H15ZM11 13.625V22.6437C11 22.85 11.16 23 11.38 23H20.64C20.86 23 21.02 22.85 21.02 22.6437V13.625H19.02V20.1875C19.02 20.7125 18.58 21.125 18.02 21.125C17.46 21.125 17.02 20.7125 17.02 20.1875V13.625H15.02V20.1875C15.02 20.7125 14.58 21.125 14.02 21.125C13.46 21.125 13.02 20.7125 13.02 20.1875V13.625H11.02H11Z"
                fill="#6366F1"
              />
            </svg>
          </div>
        </div>
        <div class="mt-8 grid">
          <div
            class="mx-auto font-josefin font-semibold text-xl"
            v-if="!generateMetadata"
          >
            <p>or</p>
          </div>
          <div class="mx-auto my-4">
            <Button
              content="generate metadata"
              color="white"
              :isFilled="false"
              @click="generateMetadata = !generateMetadata"
            />
          </div>
          <div class="grid" v-if="generateMetadata">
            <div class="grid items-center">
              <p class="font-josefin mr-2 text-sm">NFT name: <span class="font-josefin mr-2 text-xs">(optional)</span></p>
              <code>
                <input
                  class="bg-zinc-900 px-4 py-2 rounded-2xl w-full text-sm"
                  v-model="nftName"
                />
              </code>
            </div>
            <div class="grid items-center">
              <p class="font-josefin mr-2 text-sm">External link:</p>
              <code>
                <input
                  class="bg-zinc-900 px-4 py-2 rounded-2xl w-full text-sm"
                  v-model="externalLink"
                />
              </code>
            </div>
            <div class="grid items-center">
              <p class="font-josefin mr-2 text-sm">NFT description:</p>
              <code>
                <textarea
                  class="bg-zinc-900 px-4 py-2 rounded-2xl w-full h-40"
                  v-model="description"
                ></textarea>
              </code>
            </div>
            <div class="grid items-center">
              <p class="font-josefin mr-2 text-sm">Attributes:</p>
            </div>
            <div
              class="items-center bg-zinc-900 px-4 py-2 rounded-2xl"
              @click="focusInput"
              id="attributeInputContainer"
            >
              <div
                class="bg-indigo-500 w-fit font-mono py-1 px-3 rounded-full float-left flex ease-out duration-300 items-center border-2 mx-2 mb-2 flex-0 border-indigo-500 hover:bg-transparent hover:border-white"
                v-for="(attribut, index) in attributes"
                @click="attributes.splice(index, 1)"
              >
                {{ attribut.trait_type
                }}<template v-if="attribut.trait_type">:</template>
                {{ attribut.value }}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-2"
                >
                  <path
                    d="M9.7785 0.22908C9.70835 0.158765 9.625 0.10298 9.53325 0.064918C9.44145 0.0268556 9.3431 0.00726355 9.24375 0.00726355C9.14445 0.00726355 9.04605 0.0268556 8.9543 0.064918C8.86255 0.10298 8.7792 0.158765 8.70905 0.22908L5 3.93053L1.29097 0.221495C1.22075 0.151272 1.13738 0.095569 1.04563 0.0575645C0.95388 0.0195604 0.855545 7.39915e-10 0.756235 0C0.656925 -7.39915e-10 0.558585 0.0195604 0.466835 0.0575645C0.375084 0.095569 0.291718 0.151272 0.221495 0.221495C0.151272 0.291718 0.095569 0.375084 0.0575645 0.466835C0.0195604 0.558585 -7.39915e-10 0.656925 0 0.756235C7.39915e-10 0.855545 0.0195604 0.95388 0.0575645 1.04563C0.095569 1.13738 0.151272 1.22075 0.221495 1.29097L3.93053 5L0.221495 8.70905C0.151272 8.77925 0.095569 8.8626 0.0575645 8.95435C0.0195604 9.0461 0 9.14445 0 9.24375C0 9.3431 0.0195604 9.4414 0.0575645 9.53315C0.095569 9.6249 0.151272 9.7083 0.221495 9.7785C0.291718 9.84875 0.375084 9.90445 0.466835 9.94245C0.558585 9.98045 0.656925 10 0.756235 10C0.855545 10 0.95388 9.98045 1.04563 9.94245C1.13738 9.90445 1.22075 9.84875 1.29097 9.7785L5 6.06945L8.70905 9.7785C8.77925 9.84875 8.8626 9.90445 8.95435 9.94245C9.0461 9.98045 9.14445 10 9.24375 10C9.3431 10 9.4414 9.98045 9.53315 9.94245C9.6249 9.90445 9.7083 9.84875 9.7785 9.7785C9.84875 9.7083 9.90445 9.6249 9.94245 9.53315C9.98045 9.4414 10 9.3431 10 9.24375C10 9.14445 9.98045 9.0461 9.94245 8.95435C9.90445 8.8626 9.84875 8.77925 9.7785 8.70905L6.06945 5L9.7785 1.29097C10.0667 1.00274 10.0667 0.51731 9.7785 0.22908Z"
                    fill="white"
                  />
                </svg>
              </div>
              <input
                class="float-left bg-zinc-900 min-w-[14rem] mb-2 mt-1 font-mono py-1 px-2 outline-none"
                v-model="attributeInput"
                v-on:keyup.enter="addAttribute"
                id="attributeInput"
              />
            </div>
            <span class="text-xs font-josefin mt-2"
              >attributes are optional data describing your NFT. Example "Eyes:
              blue" or "King".</span
            >
          </div>
        </div>
      </div>
      <div class="mt-4">
        <Button
          class="float-right mt-8"
          :content="mintingnProgress ? 'minting...' : 'mint NFT'"
          :isDisabled="mintingnProgress"
          @click="mint"
          :state="mintingnProgress ? 'progress' : 'allowed'"
        />
      </div>
    </div>
  </BlackExpandable>
</template>

<script lang="ts">
import Button from './Button.vue';
import BlackExpandable from './BlackExpandable.vue';
import { readFileAsDataURL } from '../utils/metadata';
import type { CollectionEntitie } from '../utils/types/CollectionItem';
import { mintNFTs } from '../utils/evolve';
import Uploader from './Uploader.vue';
import { errorMessage } from '../state/error';
import { joinMetadataAndImages } from '../utils/metadata';

export default {
  components: {
    Button,
    BlackExpandable,
    Uploader,
  },
  data() {
    const imgTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const jsonTypes = ['application/json'];
    return {
      advanceMode: false,
      generatedMetadata: {} as any,
      attributes: [] as {
        trait_type: string | undefined;
        value: string;
      }[],
      attributeInput: '',
      nftName: '',
      externalLink: '',
      description: '',
      mintingnProgress: false,
      jsonTypes,
      imgTypes,
      filesToUpload: {} as { [key: string]: { image?: any; metadata?: any } },
      singleImage: undefined as any,
      singleMetadata: undefined as any,
      imageBase64: undefined as undefined | string,
      parsedJSON: undefined as undefined | string,
      generateMetadata: false,
    };
  },
  props: {
    collectionAddress: {
      type: String,
      required: true,
    },
    collection: {
      type: Object,
      required: true,
    },
  },
  methods: {
    focusInput(event: any) {
      if (event.srcElement.id === 'attributeInputContainer') {
        document.getElementById('attributeInput')?.focus();
      }
    },
    addAttribute() {
      const inputData = this.attributeInput.split(':').map((el) => el.trim());
      if (inputData.length === 1) {
        this.attributes.push({
          value: inputData[0],
          trait_type: undefined,
        });
      } else {
        this.attributes.push({
          trait_type: inputData[0],
          value: inputData[1],
        });
      }
      this.attributeInput = '';
    },
    async dropMetadata(acceptFiles: any[]) {
      if (acceptFiles.length > 1)
        return errorMessage.set('Too many files! Drop only metadata here!');
      try {
        this.singleMetadata = await acceptFiles[0].text();
        this.parsedJSON = JSON.stringify(
          JSON.parse(this.singleMetadata),
          null,
          ' ',
        );
      } catch (err) {
        throw errorMessage.set('Failed to read metadata');
      }
    },
    clearMetadata() {
      this.singleMetadata = undefined;
      this.parsedJSON = undefined;
    },
    async dropImage(acceptFiles: any[]) {
      if (acceptFiles.length > 1)
        return errorMessage.set('Too many files! Drop only image here!');
      this.imageBase64 = await readFileAsDataURL(acceptFiles[0]);
      this.singleImage = acceptFiles[0];
    },
    clearImage() {
      this.imageBase64 = undefined;
      this.singleImage = undefined;
    },
    prepareGenerateMetadataToUpload() {
      const collection = {
        name: this.collection.name,
        family: this.collection.symbol,
      };
      const symbol = this.collection.symbol;
      const evolve = this.collection ? true : false;
      const name = this.nftName === '' ? undefined : this.nftName;
      const external_url =
        this.externalLink === '' ? undefined : this.externalLink;
      const description =
        this.description === '' ? undefined : this.description;
      const attributes =
        this.attributes.length === 0 ? undefined : this.attributes;

      this.singleMetadata = JSON.stringify({
        name,
        symbol,
        external_url,
        description,
        attributes,
        evolve,
        collection,
      });
    },
    async advanceMint() {
      this.mintingnProgress = true;
      await mintNFTs(
        this.collectionAddress,
        this.filesToUpload,
        this.collection as CollectionEntitie,
      );
      this.filesToUpload = {};
      this.mintingnProgress = false;
    },
    async mint() {
      if (this.collection === undefined) {
        throw errorMessage.set('Failed to load collection data');
      }
      if (this.advanceMode) {
        return await this.advanceMint();
      }
      if (this.singleImage === undefined) {
        throw errorMessage.set('Add image to your NFT!');
      }
      if (this.generateMetadata) {
        this.prepareGenerateMetadataToUpload();
      }
      if (this.singleMetadata === undefined) {
        throw errorMessage.set('Add metadata to your NFT!');
      }
      this.mintingnProgress = true;
      const filesToUpload = {
        '1': { image: this.singleImage, metadata: this.singleMetadata },
      };
      await mintNFTs(
        this.collectionAddress,
        filesToUpload,
        this.collection as CollectionEntitie,
      );
      this.mintingnProgress = false;
    },
    async advanceDrop(acceptFiles: any[]) {
      this.filesToUpload = await joinMetadataAndImages(
        acceptFiles,
        this.imgTypes,
        this.jsonTypes,
      );
    },
  },
};
</script>
