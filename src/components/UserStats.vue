<template>
  <div v-if="collectionsCreated && tokensMinted" class="grid lg:flex">
    <div class="mt-8 w-96 h-96 mx-auto">
      <canvas id="doughnut" ref="doughnut"></canvas>
    </div>
    <div class="flex-1 flex items-center">
      <h3 class="mx-auto text-2xl font-cal">More stats coming soon!</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { getArchwaySigner } from '../utils/wallet';
import { getCollectionsStatsForAddress } from '../utils/evolve';
import Chart from 'chart.js/auto';
import { Ref, computed, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { walletSignerAddress } from '../state/walletState';

export default {
  methods: {
    createUserStatsChart(canvas: HTMLCanvasElement, data: number[]) {
      new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: ['Collections created', 'NFTs minted'],
          datasets: [
            {
              label: 'quantity',
              data,
              backgroundColor: [
                '#6366f1', // indigo 500
                '#a5b4fc', // indigo 300
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  family:
                    "'JosefinSans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    if (this.doughnut)
      this.createUserStatsChart(this.doughnut, [
        this.collectionsCreated,
        this.tokensMinted,
      ]);
  },
  async setup() {
    const doughnut: Ref<null | HTMLCanvasElement> = ref(null);
    const $walletSignerAddress = useStore(walletSignerAddress);
    if (!$walletSignerAddress.value) return {};
    
    const collectionsStats = await getCollectionsStatsForAddress($walletSignerAddress.value);
    if (!collectionsStats) return {};

    return {
      collectionsCreated: computed(() => collectionsStats.collections_created),
      tokensMinted: computed(() => collectionsStats.tokens_minted),
      doughnut,
    };
  },
};
</script>
