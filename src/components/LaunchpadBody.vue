<template>
  <LaunchpadSingleCollection v-if="openOngoing" :launchpadData="openOngoing" />
  <div class="grid" v-else>
    <LaunchpadHeader />
    <LaunchpadContainer
      :finished="finished"
      :ongoing="ongoing"
      :upcoming="upcoming"
      @openOngoing="(x) => (openOngoing = x)"
    />
  </div>
</template>

<script lang="ts">
import LaunchpadHeader from './LaunchpadHeader.vue';
import LaunchpadContainer from './LaunchpadContainer.vue';
import LaunchpadSingleCollection from './LaunchpadSingleCollection.vue';

import type { LaunchpadItem } from '../utils/types/LaunchpadItem';
import { getLaunchpadEntries } from '../utils/evolve';

export default {
  components: { LaunchpadHeader, LaunchpadContainer, LaunchpadSingleCollection },
  data() {
    return {
      finished: [] as LaunchpadItem[],
      ongoing: [] as LaunchpadItem[],
      upcoming: [] as LaunchpadItem[],
      next: null as null | string,
      singleLaunchpadCollection: false,
      openOngoing: undefined,
    };
  },
  methods: {
    setLaunchpadEntries(launchpadEntries: {
      finished?: any[] | undefined;
      ongoing?: any[] | undefined;
      upcoming?: any[] | undefined;
      next: string;
    }) {
      this.next = launchpadEntries.next;

      if (launchpadEntries.finished)
        this.finished.push(...launchpadEntries.finished);
      if (launchpadEntries.ongoing)
        this.ongoing.push(...launchpadEntries.ongoing);
      if (launchpadEntries.upcoming)
        this.upcoming.push(...launchpadEntries.upcoming);
    },
    async loadLaunchpadEntries() {
      const launchpadEntries = await getLaunchpadEntries();
      this.setLaunchpadEntries(launchpadEntries);

      while (this.next) {
        const launchpadEntries = await getLaunchpadEntries(this.next);
        this.setLaunchpadEntries(launchpadEntries);
      }
    },
  },
  async mounted() {
    await this.loadLaunchpadEntries();
  },
};
</script>
