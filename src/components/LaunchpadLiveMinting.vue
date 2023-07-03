<template>
  <div class="grid md:grid-cols-2 gap-4 relative pb-10">
    <div class="relative rounded-xl overflow-hidden -py-1 float-right">
      <div
        class="overflow-hidden flex rounded-xl bg-zinc-300 float-right p-3 m-6"
      >
        <span v-for="img in collectionImages">
          <img :src="img" draggable="false" />
        </span>
      </div>
      <LaunchpadCollectionLogo class="absolute h-[80px] w-[80px] lg:h-[100px] lg:w-[100px]" />
    </div>

    <div>
      <div class="mb-1 overflow-hidden lg:pt-10">
        <h3 class="font-cal text-3xl">{{ collectionName }}</h3>
        <p class="font-josefin text-sm -mt-2 -ml-2 px-2 mb-3 font-normal">
          supply: {{ collectionSupply }}
        </p>

        <LaunchpadLiveMintingParameter
          parameterTitle="mint price"
          :parameterSubtitle="collectionMintPrice"
        />
        <LaunchpadLiveMintingParameter
          parameterTitle="end date"
          :parameterSubtitle="collectionEndData"
        />
        <LaunchpadLiveMintingParameter
          parameterTitle="end time"
          :parameterSubtitle="collectionEndTime"
        />
        <LaunchpadLiveMintingParameter
          parameterTitle="project links"
          :parameterSubtitle="collectionProjectLinks"
        />

        <Button
          :isFilled="true"
          content="open collection >"
          color="indigo"
          class="mr-2 mt-4 float-right"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import Button from './Button.vue';
import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';
import LaunchpadLiveMintingParameter from './LaunchpadLiveMintingParameter.vue';

export default {
  components: {
    Button,
    LaunchpadCollectionLogo,
    LaunchpadLiveMintingParameter,
  },
  props: {
    collectionImages: {
      type: Array<string>,
      default: () => ['/alien.png', '/alien.png'],
      required: true,
    },
    collectionImg: {
      type: String,
      default: () => '/evolvnft-collection-logo.svg',
      required: false,
    },
    collectionName: {
      type: String,
      default: () => 'evolving beast',
      required: true,
    },
    collectionSupply: {
      type: Number,
      default: () => 0,
      required: true,
    },
    collectionMintPrice: {
      type: String,
      default: () => '',
      required: true,
    },
    collectionEndData: {
      type: String,
      default: () => '',
      required: true,
    },
    collectionEndTime: {
      type: String,
      default: () => '',
      required: true,
    },
    collectionProjectLinks: {
      type: String,
      default: () => '',
      required: true,
    },
  },
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
