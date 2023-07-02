<template>
  <div
    class="bg-black rounded-[2rem] px-8 py-4 grid my-4"
    @click="isOpen = !isOpen"
  >
    <div class="w-full flex items-center">
      <span
        class="flex-auto text-white font-josefin ease-out duration-300 font-semibold"
        :class="{ 'text-2xl': isOpen, 'text-xl': !isOpen }"
      >
        {{ title }}
      </span>
      <span class="flex-initial">
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="ease-out duration-300"
          :class="{ 'rotate-180': isOpen }"
        >
          <path
            d="M6.62073 8.125C6.84752 8.125 7.07398 8.07401 7.27953 7.97329C7.29801 7.96557 7.3153 7.95586 7.33283 7.94628C7.3357 7.94473 7.33722 7.94316 7.33992 7.94161C7.35948 7.9308 7.37915 7.91875 7.39906 7.90701C7.41813 7.8962 7.43591 7.88414 7.45404 7.87193L7.4569 7.87043C7.51343 7.83181 7.56852 7.78993 7.62002 7.74281C7.63719 7.72705 7.65451 7.71038 7.6707 7.69416L12.7129 3.0752C13.2624 2.57183 13.2624 1.76167 12.7129 1.2583C12.1634 0.754931 11.2781 0.754931 10.7286 1.2583L8.01493 3.74416L6.625 5.125L5.22374 3.72979L2.52052 1.25349C1.97103 0.750121 1.08662 0.750121 0.537127 1.25349C-0.0123675 1.75686 -0.01238 2.56782 0.537115 3.07119L5.52962 7.64461L5.53282 7.64772C5.56264 7.68155 5.59399 7.71475 5.62834 7.74611C5.90309 7.9978 6.26216 8.12501 6.62073 8.125Z"
            fill="white"
          />
        </svg>
      </span>
    </div>
    <div
      class="text-white relative overflow-hidden ease-out h-auto"
      :class="{
        'duration-[300ms] max-h-0': !isOpen,
        'duration-[3000ms] max-h-screen': isOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
