<template>
  <div class="grid">
    <div v-if="ongoing && ongoing.length >= 1">
      <LaunchpadLiveMinting
        :denom="ongoing[0].cost_denom"
        :name="ongoing[0].collection?.name"
        :description="ongoing[0].collection?.description"
        :endTime="ongoing[0].end_time"
        :startTime="ongoing[0].start_time"
        :discordUrl="ongoing[0].discord_url"
        :twitterUrl="ongoing[0].twitter_url"
        :projectUrl="ongoing[0].project_url"
        :thumbnail="
          ongoing[0].collection?.thumbnail
            ? ongoing[0].collection?.thumbnail
            : undefined
        "
        :tokenCost="ongoing[0].token_cost"
        :supply="ongoing[0].total_tokens"
        :preview="ongoing[0].preview"
        :soldTokens="ongoing[0].sold_tokens"
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
            :denom="item.cost_denom"
            :name="item.collection?.name"
            :description="item.collection?.description"
            :endTime="item.end_time"
            :startTime="item.start_time"
            :discordUrl="item.discord_url"
            :twitterUrl="item.twitter_url"
            :projectUrl="item.project_url"
            :thumbnail="
              ongoing[0].collection?.thumbnail
                ? ongoing[0].collection?.thumbnail
                : undefined
            "
            :tokenCost="item.token_cost"
            :supply="item.total_tokens"
            :preview="item.preview"
            :soldTokens="item.sold_tokens"
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
            :denom="item.cost_denom"
            :name="item.collection?.name"
            :description="item.collection?.description"
            :endTime="item.end_time"
            :startTime="item.start_time"
            :discordUrl="item.discord_url"
            :twitterUrl="item.twitter_url"
            :projectUrl="item.project_url"
            :thumbnail="
              item.collection?.thumbnail
                ? item.collection?.thumbnail
                : undefined
            "
            :tokenCost="item.token_cost"
            :supply="item.total_tokens"
            :preview="item.preview"
            :soldTokens="item.sold_tokens"
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
            :denom="item.cost_denom"
            :name="item.collection?.name"
            :description="item.collection?.description"
            :endTime="item.end_time"
            :startTime="item.start_time"
            :discordUrl="item.discord_url"
            :twitterUrl="item.twitter_url"
            :projectUrl="item.project_url"
            :thumbnail="
              item.collection?.thumbnail
                ? item.collection?.thumbnail
                : undefined
            "
            :tokenCost="item.token_cost"
            :supply="item.total_tokens"
            :preview="item.preview"
            :soldTokens="item.sold_tokens"
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
import type { CollectionLaunchpadEntrie } from '../utils/types/CollectionLaunchpadEntrie';

export default {
  components: { LaunchpadLiveMinting, UpcomingMintBox },
  emits: ['openOngoing'],
  props: {
    finished: {
      type: Array<CollectionLaunchpadEntrie>,
      required: false,
    },
    ongoing: {
      type: Array<CollectionLaunchpadEntrie>,
      required: false,
    },
    upcoming: {
      type: Array<CollectionLaunchpadEntrie>,
      required: false,
    },
    openOngoing: {
      type: Function,
    },
  },
};
</script>
