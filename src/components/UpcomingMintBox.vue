<template>
  <div
    class="grid grid-cols-1 sm:px-4 place-content-center bg-black h-[315px] rounded-2xl"
  >
    <div>
      <div class="px-6 pb-7 grid-cols-2">
        <LaunchpadCollectionLogo
          class="bg-white h-[64px] w-[64px] sm:h-[100px] sm:w-[100px] rounded-3xl"
        />
        <div class="grid">
          <div
            class="text-white text-base sm:text-md lg:text-2xl font-cal pt-2 float-left pl-4"
          >
            evolving beasts
          </div>
          <p
            class="font-josefin text-white text-sm pl-4 font-normal float-left"
          >
            supply: {{ collectionSupply }}
          </p>
        </div>
      </div>
      <div class="md:pt-6 m-4 pl-3">
        <UpcomingMintBoxParameter
          subtitleColor="white"
          parameterTitle="mint price"
          :parameterSubtitle="collectionMintPrice"
        />
        <UpcomingMintBoxParameter
          subtitleColor="white"
          parameterTitle="end date"
          :parameterSubtitle="collectionEndData"
        />
        <UpcomingMintBoxParameter
          subtitleColor="white"
          parameterTitle="end time"
          :parameterSubtitle="collectionEndTime"
        />
        <UpcomingMintBoxParameter
          subtitleColor="white"
          parameterTitle="project links"
          :parameterSubtitle="collectionProjectLinks"
        />
      </div>
      <div>
        <Button
          :isFilled="true"
          :content="
            status === 'ongoing'
              ? 'open launchpad >'
              : status === 'upcoming'
              ? 'add to calendar'
              : 'open collection >'
          "
          :is-coming-soon="status === 'upcoming'"
          :is-disabled="status === 'upcoming'"
          color="indigo"
          class="mr-2 float-right pr-4"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import Button from './Button.vue';
import LaunchpadCollectionLogo from './LaunchpadCollectionLogo.vue';
import UpcomingMintBoxParameter from './UpcomingMintBoxParameter.vue';

export default {
  components: {
    Button,
    LaunchpadCollectionLogo,
    UpcomingMintBoxParameter,
  },
  props: {
    collectionSupply: {
      type: Number,
      default: () => 0,
      required: true,
    },
    collectionMintPrice: {
      type: String,
      default: () => '1000',
      required: true,
    },
    collectionEndData: {
      type: String,
      default: () => '26.06.2012',
      required: true,
    },
    collectionEndTime: {
      type: String,
      default: () => '24h',
      required: true,
    },
    collectionProjectLinks: {
      type: String,
      default: () => 'twitch.tv/BiedaczeG',
      required: true,
    },
    status: {
      type: String as PropType<'ongoing' | 'upcoming' | 'finished'>,
      default: () => 'ongoing',
      required: false,
      validator: (s: string) => ['ongoing', 'upcoming', 'finished'].includes(s),
    },
  },
};
</script>
