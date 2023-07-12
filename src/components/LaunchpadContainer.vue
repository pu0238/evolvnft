<template>
  <div class="grid">
    <div v-if="ongoing && ongoing.length >= 1">
      <LaunchpadLiveMinting
            :denom="ongoing[0].costDenom"
            :name="ongoing[0].name"
            :description="ongoing[0].description"
            :endTime="ongoing[0].endTime"
            :startTime="ongoing[0].startTime"
            :discordUrl="ongoing[0].discordUrl"
            :twitterUrl="ongoing[0].twitterUrl"
            :projectUrl="ongoing[0].projectUrl"
            :thumbnail="ongoing[0].thumbnail"
            :tokenCost="ongoing[0].tokenCost"
            :supply="ongoing[0].totalTokens"
            :preview="ongoing[0].preview"
            :soldTokens="ongoing[0].soldTokens"
            status="ongoing"
            @openLaunchpad="$emit('openOngoing', ongoing[0])"
      />
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-if="ongoing.length > 1"
      >
        <template v-for="(item, index) in ongoing">
          <UpcomingMintBox
            v-if="index != 0"
            :denom="item.costDenom"
            :name="item.name"
            :description="item.description"
            :endTime="item.endTime"
            :startTime="item.startTime"
            :discordUrl="item.discordUrl"
            :twitterUrl="item.twitterUrl"
            :projectUrl="item.projectUrl"
            :thumbnail="item.thumbnail"
            :tokenCost="item.tokenCost"
            :supply="item.totalTokens"
            :preview="item.preview"
            :soldTokens="item.soldTokens"
            status="ongoing"
          />
        </template>
      </div>
    </div>
    <div v-if="upcoming && upcoming.length >= 1">
      <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
        🔮upcoming mints
      </h1>
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-if="upcoming.length > 1"
      >
        <template v-for="(item, index) in upcoming">
          <UpcomingMintBox
          :denom="item.costDenom"
            :name="item.name"
            :description="item.description"
            :endTime="item.endTime"
            :startTime="item.startTime"
            :discordUrl="item.discordUrl"
            :twitterUrl="item.twitterUrl"
            :projectUrl="item.projectUrl"
            :thumbnail="item.thumbnail"
            :tokenCost="item.tokenCost"
            :supply="item.totalTokens"
            :preview="item.preview"
            :soldTokens="item.soldTokens"
            status="upcoming"
          />
        </template>
      </div>
    </div>
    <div v-if="finished && finished.length >= 1">
      <h1 class="text-black text-5xl xl:text-6xl 2xl:text-7xl font-cal py-10">
        🍆completeed mints
      </h1>
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-if="finished.length > 1"
      >
        <template v-for="(item, index) in finished">
          <UpcomingMintBox
            :denom="item.costDenom"
            :name="item.name"
            :description="item.description"
            :endTime="item.endTime"
            :startTime="item.startTime"
            :discordUrl="item.discordUrl"
            :twitterUrl="item.twitterUrl"
            :projectUrl="item.projectUrl"
            :thumbnail="item.thumbnail"
            :tokenCost="item.tokenCost"
            :supply="item.totalTokens"
            :preview="item.preview"
            :soldTokens="item.soldTokens"
            status="finished"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LaunchpadLiveMinting from './LaunchpadLiveMinting.vue';
import UpcomingMintBox from './UpcomingMintBox.vue';
import type { LaunchpadItem } from '../utils/types/LaunchpadItem';

export default {
  components: { LaunchpadLiveMinting, UpcomingMintBox },
  emits: ['openOngoing'],
  props: {
    finished: {
      type: Array<LaunchpadItem>,
      required: false,
    },
    ongoing: {
      type: Array<LaunchpadItem>,
      required: false,
    },
    upcoming: {
      type: Array<LaunchpadItem>,
      required: false,
    },
    openOngoing: {
      type: Function,
    },
  }
};
</script>
