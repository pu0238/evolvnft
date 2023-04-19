<template>
  <CollectionSection v-if="step === 0" @next="nextStep" />
  <CollectionBuilder
    v-if="step > 0 && step <= 5"
    @next="nextStep"
    @back="previousStep"
    v-model:emitedCollectionTitle="collectionTitle"
    v-model:emitedCollectionImg="collectionImg"
    v-model:emitedCollectionSymbol="collectionSymbol"
    v-model:emitedCollectionDescription="collectionDescription"
    @acceptFiles="(files: Array<any>) => updateCollectionLogo(files)"
    :step="step"
  />
</template>

<script lang="ts">
import CollectionSection from "./CollectionSection.vue";
import CollectionBuilder from "./CollectionBuilder.vue";
import { computed, reactive } from "vue";
import { useStore } from "@nanostores/vue";
import { isColectionClosed, tokenLimit } from "../state/collectionState";

export default {
  data() {
    return {
      step: 0,
      collectionImg: "/evolvnft-collection-logo.svg",
      collectionTitle: "Evolv NFT",
      collectionSymbol: "EN",
      collectionDescription:
        "this is example description of your digital asset. it should be short and clear.",
      acceptFiles: [],
    };
  },
  components: {
    CollectionSection,
    CollectionBuilder,
  },

  methods: {
    updateCollectionLogo(files: Array<any>) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const base64data = reader.result?.toString();
        base64data && (this.collectionImg = base64data);
      };
    },
    nextStep() {
      this.step++;
    },
    previousStep() {
      this.step--;
    },
  },
  setup(props) {
    props = reactive(props);
    const $isColectionClosed = useStore(isColectionClosed);
    const $tokenLimit = useStore(tokenLimit);
    return {
      isColectionClosedValue: computed(() => $isColectionClosed.value),
      tokenLimitValue: computed(() => $tokenLimit.value),
    };
  },
};
</script>
