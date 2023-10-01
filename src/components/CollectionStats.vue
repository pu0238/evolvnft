<template>
  <div
    class="bg-black float-left p-8 sm:p-12 md:p-16 rounded-[3rem] sm:grid sm:grid-cols-3 gap-4"
  >
    <div class="col-span-2">
      <h2 class="text-4xl md:text-5xl 2xl:text-6xl font-cal text-white">
        We <span class="text-indigo-500">helped</span> create
      </h2>
      <div class="my-8">
        <HeaderSubtitle
          textColor="white"
          content="Thanks to our system we are able to track all created collections! And also to provide them with opportunities that only projects with a whole background of programmers could count on so far!"
        />
        <HeaderSubtitle
          class="my-6"
          textColor="white"
          content="Become a creator today!"
        />
      </div>
    </div>
    <div
      class="my-auto sm:ml-8 text-center sm:flex-0 sm:justify-items-start sm:items-center sm:text-left"
    >
      <span>
        <div class="text-4xl md:text-5xl 2xl:text-6xl font-cal text-indigo-500">
          {{ collectionsCount }}
        </div>
        <HeaderSubtitle textColor="white" content="Collections" />
      </span>
      <span>
        <div class="text-4xl md:text-5xl 2xl:text-6xl font-cal text-indigo-500">
          {{ tokensCount }}
        </div>
        <HeaderSubtitle textColor="white" content="Tokens created" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import SecondSectionLeft from './SecondSectionLeft.vue';
import HeaderSubtitle from './HeaderSubtitle.vue';
import Button from './Button.vue';

import { computed } from 'vue';
import { getCollectionsStats } from '../utils/evolve';

export default {
  components: { SecondSectionLeft, HeaderSubtitle, Button },
  async setup() {
    const collectionManagerStats = await getCollectionsStats();
    if (!collectionManagerStats) return {};

    return {
      tokensCount: computed(() => collectionManagerStats.tokens_count),
      collectionsCount: computed(
        () => collectionManagerStats.collections_count,
      ),
    };
  },
};
</script>
