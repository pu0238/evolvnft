<template>
  <div>
    <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
      💷live minting
    </h1>
  </div>
  <div class="grid md:grid-cols-2 gap-4 relative">
    <div class="relative rounded-xl overflow-hidden -py-1 float-right">
      <div
        class="overflow-hidden flex rounded-xl bg-zinc-300 float-right p-3 m-6"
      >
        <span v-for="img in preview">
          <img
            :src="
              img.a.length === 42
                ? `https://arweave.net/${img.a}`
                : `${carnister}/${img.a}/${img.b}/${img.c}`
            "
          />
        </span>
      </div>
      <LaunchpadCollectionLogo class="absolute" />
    </div>

    <div>
      <div class="mb-1 overflow-hidden flex-none py-9">
        <h3 class="font-cal text-3xl">{{ name }}</h3>
        <p class="font-josefin text-sm -mt-2 -ml-2 px-2 mb-3 font-normal">
          supply: {{ supply }}
        </p>

        <LaunchpadLiveMintingParameter
          parameterTitle="mint price"
          :parameterSubtitle="`${tokenCost} ${denom}`"
        />
        <LaunchpadLiveMintingParameter
          parameterTitle="end date"
          :parameterSubtitle="parseDate(endTime)"
        />
        <LaunchpadLiveMintingParameter
          parameterTitle="end time"
          :parameterSubtitle="parseTime(endTime)"
        />
        <LaunchpadLiveMintingParameter
          parameterTitle="project links"
          :discordUrl="discordUrl"
          :twitterUrl="twitterUrl"
          :projectUrl="projectUrl"
        />

        <Button
          :isFilled="true"
          content="mint site >"
          color="indigo"
          class="mr-2 float-right mt-4"
          @click="$emit('openLaunchpad')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue';
import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';
import LaunchpadLiveMintingParameter from './LaunchpadLiveMintingParameter.vue';
import { CARNISTER_API_URL } from '../utils/constant';
import { parseDate, parseTime } from '../utils/schared';
export default {
  components: {
    Button,
    LaunchpadCollectionLogo,
    LaunchpadLiveMintingParameter,
  },
  emits: ['openLaunchpad'],
  props: {
    supply: {
      type: Number,
      default: () => 0,
      required: true,
    },
    tokenCost: {
      type: String,
      default: () => '1000',
      required: true,
    },
    endTime: {
      type: String,
      default: () => '26.06.2012',
      required: true,
    },
    startTime: {
      type: String,
      default: () => '24h',
      required: true,
    },
    discordUrl: {
      type: String,
      default: () => 'twitch.tv/pu0238',
      required: true,
    },
    projectUrl: {
      type: String,
      default: () => 'twitch.tv/pu0238',
      required: true,
    },
    twitterUrl: {
      type: String,
      default: () => 'twitch.tv/pu0238',
      required: true,
    },
    thumbnail: {
      type: String,
      default: () => '/evolvnft-collection-logo.svg',
      required: true,
    },
    name: {
      type: String,
      default: () => 'evolv hackermans',
      required: true,
    },
    denom: {
      type: String,
      default: () => 'arch',
      required: true,
    },
    preview: {
      type: Array<any>,
      default: () => undefined,
      required: true,
    },
    openLaunchpad: {
      required: false,
    },
  },
  computed: {
    carnister: () => CARNISTER_API_URL,
  },
  methods: {
    parseDate,
    parseTime,
  },
};
</script>
