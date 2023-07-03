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

export default {
  data() {
    return {
      collectionsCreated: undefined,
      tokensMinted: undefined,
    };
  },
  async mounted() {
    const { signerAddress } = await getArchwaySigner();
    const { collectionsCreated, tokensMinted } =
      await getCollectionsStatsForAddress(signerAddress);
    this.collectionsCreated = collectionsCreated;
    this.tokensMinted = tokensMinted;
    
    this.$nextTick(function () {
      const doughnut = document.getElementById('doughnut') as any;
      const chart = new Chart(doughnut, {
        type: 'doughnut',
        data: {
          labels: ['Collections created', 'Tokens minted'],
          datasets: [
            {
              label: 'quantity',
              data: [this.collectionsCreated, this.tokensMinted],
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
    });
  },
};
</script>
