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
          </p>
          <InputArea
            v-if="step === 1"
            class="mt-4 md:mt-14 lg:mt-16"
            placeholder="name like: Evolve NFT"
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
          />
        </div>
      </div>
      <div
        class="float-left w-full flex justify-center lg:w-auto lg:block lg:mx-auto"
      >
        <CollectionBaner
          :collectionImg="collectionImg || emitedCollectionImg"
          :collectionSymbol="collectionSymbol || emitedCollectionSymbol"
          :collectionTitle="collectionTitle || emitedCollectionTitle"
          :collectionDescription="
            collectionDescription || emitedCollectionDescription
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
      />
      <Button
        class="float-right"
        content="next step"
        arrow="right"
        @click="goNext"
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
import { reactive } from "vue";

export default {
  data() {
    return {
      collectionImg: undefined,
      collectionTitle: undefined,
      collectionSymbol: undefined,
      collectionDescription: undefined,
    };
  },
  methods: {
    saveColectionData() {
      this.collectionImg &&
        this.$emit("emitedCollectionImg", this.collectionImg);
      this.collectionTitle &&
        this.$emit("update:emitedCollectionTitle", this.collectionTitle);
      this.collectionSymbol &&
        this.$emit("emitedCollectionSymbol", this.collectionSymbol);
      this.collectionDescription &&
        this.$emit("emitedCollectionDescription", this.collectionDescription);
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
    SecondSectionLeft,
    HeaderSubtitle,
    Button,
    CollectionBaner,
    SecondSectionTitle,
    InputArea,
    Uploader,
  },
  props: {
    textColor: {
      type: String,
      default: "white",
      required: false,
      validator: (color: string) => ["white", "black"].includes(color),
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
    //  Emited data
    emitedCollectionImg: {
      type: String,
      default: "/evolvnft-collection-logo.svg",
      required: false,
    },
    emitedCollectionSymbol: {
      type: String,
      default: "EN",
      required: false,
    },
    emitedCollectionDescription: {
      type: String,
      default:
        "this is example description of your digital asset. it should be short and clear.",
      required: false,
    },
    emitedCollectionTitle: {
      type: String,
      default: "Evolv NFT",
      required: false,
    },
  },
  emits: [
    "next",
    "back",
    "emitedCollectionImg",
    "emitedCollectionSymbol",
    "emitedCollectionDescription",
    "update:emitedCollectionTitle",
  ],
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
