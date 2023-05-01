<template>
  <div
    class="bg-black float-left p-8 sm:p-12 md:p-16 rounded-[3rem] xl:min-h-[32rem]"
  >
    <div class="float-left w-full lg:flex justify-between">
      <div class="lg:max-w-md xl:max-w-lg my-8 w-full">
        <h2 class="text-4xl md:text-5xl font-cal text-white">
          <span v-if="step === 1">
            <span class="text-indigo-500">set</span> collection
            <span class="text-indigo-500">name</span>
          </span>
          <span v-if="step === 2">
            <span class="text-indigo-500">set</span> collection
            <span class="text-indigo-500">symbol</span>
          </span>
          <span v-if="step === 3">
            <span class="text-indigo-500">set</span> collection
            <span class="text-indigo-500">description</span>
          </span>
          <span v-if="step === 4">
            <span class="text-indigo-500">set</span> collection
            <span class="text-indigo-500">image</span>
          </span>
          <span v-if="step === 5">
            select a <span class="text-indigo-500">metadata</span> type!
          </span>
          <span v-if="step === 6">
            <span class="text-indigo-500">open</span> or
            <span class="text-indigo-500">closed</span> collection?
          </span>
          <span v-if="step === 7">
            your <span class="text-indigo-500">collection</span> has been
            <span class="text-indigo-500">created</span>!
          </span>
        </h2>
        <div class="my-2 lg:my-8">
          <p class="text-md md:text-lg lg:text-xl font-josefin text-zinc-300">
            <span v-if="step === 1">
              the name of the collection will distinguish your collection from
              others and maintain transparency. remember that the name should be
              simple and catchy
            </span>
            <span v-if="step === 2">
              symbol is a few letter abbreviation that is supposed to symbolize
              our collection
            </span>
            <span v-if="step === 3">
              describe your collection. remember the description should be brief
              but accurate.
            </span>
            <span v-if="step === 4">
              The image of the collection is incredibly important because it
              will be visible as the main image of the collection.
            </span>
            <span v-if="step === 5">
              here you can decide whether you want to use metadata or
              evolv-metadata. Usually metadata is not mutable unlike
              evlov-metadata!
            </span>
            <span v-if="step === 6">
              At this stage, you will specify whether the collection you create
              should be limited to a certain number of tokens
            </span>
            <span v-if="step === 7">
              To create tokens or create a candie machine go to collection
              management
            </span>
          </p>
          <InputArea
            v-if="step === 1"
            class="mt-4 md:mt-14 lg:mt-16"
            placeholder="name like: Evolv NFT"
            heading="Collecrion name:"
            v-model="collectionTitle"
          />
          <InputArea
            v-if="step === 2"
            class="mt-4 md:mt-14 lg:mt-16"
            placeholder="symbol like: EN"
            heading="Collecrion symbol:"
            v-model="collectionSymbol"
          />
          <InputArea
            v-if="step === 3"
            class="mt-4 md:mt-14 lg:mt-16"
            placeholder="describe your collection here"
            heading="Collecrion description:"
            v-model="collectionDescription"
          />
          <Uploader
            class="mt-4 md:mt-14 lg:mt-16"
            v-if="step === 4"
            heading="Drag image here:"
            @acceptFiles="(files: any[]) => emitAcceptFiles(files)"
          />
          <EvolvMetadata
            v-if="step === 5"
            class="mt-4 md:mt-14 lg:mt-16"
            v-model:checked="isColectionMetadataEvolv"
          />
          <LockCollection
            class="mt-4 md:mt-14 lg:mt-16"
            v-if="step === 6"
            v-model:checked="isColectionOpen"
            v-model:tokenLimit="tokenLimit"
          />
        </div>
      </div>
      <div
        class="float-left w-full flex justify-center lg:w-auto lg:block lg:mx-auto"
      >
        <CollectionBaner
          :collectionImg="collectionImg || collectionImgValue"
          :collectionSymbol="collectionSymbol || collectionSymbolValue"
          :collectionTitle="collectionTitle || collectionTitleValue"
          :collectionDescription="
            collectionDescription || collectionDescriptionValue
          "
        />
      </div>
    </div>
    <div class="w-full float-left mt-4">
      <Button
        class="float-left"
        content="back"
        arrow="left"
        color="white"
        :isFilled="false"
        @click="goBack"
        v-if="step !== 7"
      />
      <Button
        class="float-right"
        content="create collection 🎉"
        @click="goNext"
        v-if="step === 6"
      />
      <Button
        :isDisabled="!collectionTitle"
        class="float-right"
        content="next step"
        arrow="right"
        @click="goNext"
        v-else-if="step === 1"
      />
      <Button
        :isDisabled="!collectionSymbol"
        class="float-right"
        content="next step"
        arrow="right"
        @click="goNext"
        v-else-if="step === 2"
      />
      <Button
        :isDisabled="!collectionDescription"
        class="float-right"
        content="next step"
        arrow="right"
        @click="goNext"
        v-else-if="step === 3"
      />
      <Button
        :isDisabled="acceptFilesData.length === 0"
        class="float-right"
        content="next step"
        arrow="right"
        @click="goNext"
        v-else-if="step === 4"
      />
      <Button
        class="float-right"
        content="next step"
        arrow="right"
        @click="goNext"
        v-else-if="step === 5"
      />
      <Button
        class="float-right"
        :content="
          buildingCollection ? 'building collection...' : 'menage collections'
        "
        :href="buildingCollection ? undefined : '/collection-manager'"
        arrow="right"
        :state="buildingCollection ? 'progress' : 'allowed'"
        :isDisabled="buildingCollection"
        v-else-if="step === 7"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SecondSectionLeft from "./SecondSectionLeft.vue";
import HeaderSubtitle from "./HeaderSubtitle.vue";
import Button from "./Button.vue";
import CollectionBaner from "./CollectionBaner.vue";
import SecondSectionTitle from "./SecondSectionTitle.vue";
import InputArea from "./InputArea.vue";
import Uploader from "./Uploader.vue";
import LockCollection from "./LockCollection.vue";
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
import EvolvMetadata from "./EvolvMetadata.vue";

export default {
  data() {
    return {
      collectionImg: undefined,
      collectionTitle: undefined,
      collectionSymbol: undefined,
      collectionDescription: undefined,
      isColectionOpen: false,
      isColectionMetadataEvolv: false,
      tokenLimit: "",
      acceptFilesData: [] as any[],
    };
  },
  methods: {
    emitAcceptFiles(files: any[]) {
      this.acceptFilesData = files;
      this.$emit("acceptFiles", files);
    },
    saveColectionData() {
      this.collectionImg && collectionImg.set(this.collectionImg);
      this.collectionTitle && collectionTitle.set(this.collectionTitle);
      this.collectionSymbol && collectionSymbol.set(this.collectionSymbol);
      this.collectionDescription &&
        collectionDescription.set(this.collectionDescription);
      this.isColectionOpen && isColectionClosed.set(this.isColectionOpen);
      this.isColectionMetadataEvolv &&
        collectionEvolvMetadata.set(this.isColectionMetadataEvolv);
      this.tokenLimit && tokenLimit.set(this.tokenLimit);
    },
    goNext() {
      this.saveColectionData();
      this.$emit("next");
    },
    goBack() {
      this.saveColectionData();
      this.$emit("back");
    },
  },
  components: {
    EvolvMetadata,
    SecondSectionLeft,
    HeaderSubtitle,
    Button,
    CollectionBaner,
    SecondSectionTitle,
    InputArea,
    Uploader,
    LockCollection,
  },
  props: {
    buildingCollection: {
      type: Boolean,
      default: false,
      required: false,
    },
    textColor: {
      type: String,
      default: "white",
      required: false,
      validator: (color: string) => ["white", "black"].includes(color),
    },
    emitedTokenLimit: {
      type: String,
    },
    next: {
      type: Function,
    },
    back: {
      type: Function,
    },
    step: {
      type: Number,
    },
    acceptFiles: {
      type: Array,
    },
    emitedIsColectionOpen: {
      type: Boolean,
    },
  },
  emits: ["next", "back", "acceptFiles"],
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
        () => $collectionEvolvMetadata.value
      ),
    };
  },
};
</script>
