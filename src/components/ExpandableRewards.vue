<template>
  <BlackExpandable title="rewards">
    <div class="mx-4 my-6 grid">
      <p class="font-josefin font-normal text-sm">
        Inspect and withdraw your collection's rewards accumulated through
        contract interactions.
        <a
          href="https://docs.archway.io/overview/rewards"
          class="text-indigo-500 font-semibold"
          target="_blank"
          >Read more about the rewards.</a
        >
      </p>
      <div class="w-full mb-2 grid mt-8">
        <div class="grid items-center">
          <p class="font-josefin mr-2 font-semibold">Percentage of rewards distribution:</p>
          <div class="flex mb-2">
            <div class="flex-1 mr-4 mt-1">
              <input
                v-model="sliderValue"
                oninput="rangenumber.value=value"
                id="range"
                type="range"
                min="0"
                :step="0.01"
                max="100"
                class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-700"
              />
              <br />
            </div>
            <code>
              <input
                class="bg-zinc-900 px-4 py-2 rounded-2xl w-full min-w-[6rem]"
                type="number"
                oninput="range.value=value"
                id="rangenumber"
                max="100"
                min="0"
                v-model="sliderValue"
                @input="updateValue"
              />
            </code>
          </div>
          <div>
            <Button
              content="set reward fee"
              class="float-right mt-2"
              @click="setCollectionRewards"
            />
          </div>
          <span class="text-xs font-josefin mt-2"
            >set the percentage of the rewards distribution of the collection
            with the token holders.</span
          >
        </div>
      </div>
      <div class="w-full mt-8 hidden">
        <div class="grid items-center">
          <p class="font-josefin mr-2">Split rewards with token holders:</p>
          <div class="flex">
            <div class="mt-5 flex-1">
              <label
                class="relative inline-flex items-center mr-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  v-model="checkboxSplitRewards"
                />
                <div
                  class="w-11 h-6 bg-zinc-700 rounded-full peer peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"
                ></div>
              </label>
            </div>
            <div class="">
              <Button content="save split" class="float-right mt-2" />
            </div>
          </div>
          <span class="text-xs font-josefin mt-2"
            >Decide if you want to share rewards with token holders.</span
          >
        </div>
      </div>
      <div class="w-full grid mt-8">
        <div class="grid items-center">
          <p class="font-josefin mr-2">Split rewards with token holders:</p>
          <div class="w-full">
            <Button
              content="withdraw rewards"
              class="float-right mt-2"
              @click="withdrawal"
            />
          </div>
          <span class="text-xs font-josefin mt-2"
            >withdrawal of cumulative rewards.</span
          >
        </div>
      </div>
    </div>
  </BlackExpandable>
</template>

<script lang="ts">
import { setRewardsFee, withdrawalRewards } from '../utils/evolve';
import BlackExpandable from './BlackExpandable.vue';
import Button from './Button.vue';

export default {
  components: { BlackExpandable, Button },
  props: {
    rewardPercentage: {
      type: Number,
      default: 0,
    },
    splitRewards: {
      type: Boolean,
      default: true,
    },
    collectionAddress: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sliderValue: 0,
      checkboxSplitRewards: true,
    };
  },
  methods: {
    async setCollectionRewards() {
      const rewardFee = Number(this.sliderValue) * 100;
      if (this.rewardPercentage === rewardFee)
        return console.log('Reward is equal to the selected value');
      await setRewardsFee(
        this.collectionAddress,
        Number(this.sliderValue) * 100,
      );
    },
    async withdrawal() {
      await withdrawalRewards(this.collectionAddress);
    },
    handleInputChange(e: any) {
      let target = e.target;
      if (e.target.type !== 'range') {
        target = document.getElementById('range');
      }
      this.setupInputRange(target);
    },
    updateValue(event: any) {
      const value = event.target.value;
      if (String(value).length <= 10) {
        this.sliderValue = value;
      }
      this.$forceUpdate();
    },
    setupInputRange(rangeInputs: any) {
      const min = rangeInputs.min;
      const max = rangeInputs.max;
      const val = rangeInputs.value;

      rangeInputs.style.backgroundSize =
        ((val - min) * 100) / (max - min) + '% 100%';
    },
  },
  watch: {
    sliderValue(number, latest) {
      if (number > 100) this.sliderValue = latest;
      else if (number < 0) this.sliderValue = latest;
      else if (String(number).length >= 6) this.sliderValue = latest;
    },
    rewardPercentage(newValue) {
      this.sliderValue = newValue / 100;
      const rangeInputs = document.querySelector('input[type="range"]') as any;
      if (rangeInputs) {
        rangeInputs.value = this.sliderValue;
        this.setupInputRange(rangeInputs);
      }
    },
    splitRewards(newValue) {
      this.checkboxSplitRewards = newValue;
    },
  },
  mounted() {
    this.checkboxSplitRewards = this.splitRewards;
    const rangeInputs = document.querySelector('input[type="range"]') as any;
    const numberInput = document.querySelector('input[type="number"]');

    if (rangeInputs) {
      rangeInputs.addEventListener('input', this.handleInputChange);
    }
    if (numberInput) {
      numberInput.addEventListener('input', this.handleInputChange);
    }
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

input[type='range'] {
  -webkit-appearance: none;
  margin-right: 15px;
  border-radius: 5px;
  background-image: linear-gradient(#6366f1, #6366f1);
  background-size: 70% 100%;
  background-repeat: no-repeat;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 100%;
  background: #6366f1;
}
</style>
