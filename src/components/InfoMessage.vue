<template>
  <div
    class="info float-right ml-1 py-3 px-6 my-1 bg-indigo-500 rounded-full text-white font-josefin ease-out flex items-center text-base w-fit"
  >
    <svg
      width="8"
      height="23"
      viewBox="0 0 8 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.69422 0.000234461C7.02356 0.000260071 7.1356 0.0289164 7.31438 0.136476C7.45035 0.218426 7.61906 0.404902 7.69003 0.550671C7.81319 0.803692 7.80455 1.08591 7.49129 6.79715C7.12451 13.4862 7.16761 13.1722 6.57514 13.4671C6.23884 13.6346 6.20414 13.6364 3.87397 13.6154C1.61063 13.5949 1.50599 13.5877 1.30117 13.4381C0.821239 13.0876 0.85519 13.3693 0.485005 6.82644C0.274248 3.10383 0.169722 0.742738 0.210696 0.639532C0.247043 0.547594 0.384325 0.372799 0.516087 0.250463L0.756641 0.0281744L3.91183 0.0076786C4.67317 0.00255672 5.25111 0.000234461 5.69422 0.000234461ZM3.96326 15.2154C4.55521 15.2077 5.15123 15.3271 5.70503 15.5846C8.20635 16.748 8.78333 19.9346 6.83738 21.8404C5.79037 22.8658 4.32294 23.2383 2.86603 22.8488C2.20188 22.6713 1.62546 22.3271 1.10265 21.7967C0.250992 20.9327 -0.0504626 20.1382 0.00675034 18.9011C0.048065 18.0046 0.150321 17.6969 0.654019 16.9437C1.38348 15.8532 2.66093 15.2303 3.96326 15.2154Z"
        fill="white"
      />
    </svg>
    <span class="flex relative ml-2 top-[2px]">
      <p class="mr-1">Info:</p>
      <p v-html="content"></p
    ></span>
  </div>
</template>

<style>
.info {
  animation: fadeInAndOut 4s linear forwards;
}
@-moz-keyframes fadeInAndOut {
  0% {
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes fadeInAndOut {
  0% {
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-o-keyframes fadeInAndOut {
  0% {
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeInAndOut {
  0% {
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      show: true,
    };
  },
  props: {
    content: {
      type: String,
      default: () => 'make sure your wallet is connected!',
      required: true,
    },
  },
};
</script>
