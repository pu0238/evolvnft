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

import { getLaunchpadEntries } from '../utils/evolve';
import type { CollectionLaunchpadEntrie } from '../utils/types/CollectionLaunchpadEntrie';
import { Ref, ref } from 'vue';

export default {
  components: {
    LaunchpadHeader,
    LaunchpadContainer,
    LaunchpadSingleCollection,
  },
  data() {
    return {
      finished: [] as CollectionLaunchpadEntrie[],
      ongoing: [] as CollectionLaunchpadEntrie[],
      upcoming: [] as CollectionLaunchpadEntrie[],
      singleLaunchpadCollection: false,
      openOngoing: undefined as undefined | CollectionLaunchpadEntrie,
    };
  },
  async setup() {
    const finished: Ref<CollectionLaunchpadEntrie[]> = ref([]);
    const ongoing: Ref<CollectionLaunchpadEntrie[]> = ref([]);
    const upcoming: Ref<CollectionLaunchpadEntrie[]> = ref([]);

    const launchpadEntries = await getLaunchpadEntries();
    if (launchpadEntries.finished)
      finished.value.push(...launchpadEntries.finished);
    if (launchpadEntries.ongoing)
      ongoing.value.push(...launchpadEntries.ongoing);
    if (launchpadEntries.upcoming)
      upcoming.value.push(...launchpadEntries.upcoming);

    return {
      finished,
      ongoing,
      upcoming,
    };
  },
};
</script>
