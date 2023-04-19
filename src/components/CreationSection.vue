<template>
  <CollectionSection v-if="step === 0" @next="nextStep" />
  <CollectionBuilder
    v-if="step > 0 && step <= 4"
    @next="nextStep"
    @back="previousStep"
    v-model:emitedCollectionTitle="collectionTitle"
    v-model:emitedCollectionImg="collectionImg"
    v-model:emitedCollectionSymbol="collectionSymbol"
    v-model:emitedCollectionDescription="collectionDescription"
    :step="step"
  />
</template>

<script lang="ts">
import CollectionSection from "./CollectionSection.vue";
import CollectionBuilder from "./CollectionBuilder.vue";

export default {
  data() {
    return {
      step: 0,
      collectionImg: "/evolvnft-collection-logo.svg",
      collectionTitle: "Evolv NFT",
      collectionSymbol: "EN",
      collectionDescription:
        "this is example description of your digital asset. it should be short and clear.",
    };
  },
  components: {
    CollectionSection,
    CollectionBuilder,
  },

  methods: {
    nextStep() {
      this.step++;
    },
    previousStep() {
      this.step--;
    },
  },
};
</script>
