<template>
  <div
    class="error float-right py-3 px-6 my-1 bg-red-500 rounded-full text-white font-josefin ease-out flex items-center text-xl w-fit"
  >
    <svg
      width="33"
      height="29"
      viewBox="0 0 33 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="float-left ml"
    >
      <path
        d="M32.6286 24.9226C33.6861 26.7348 32.3587 29 30.2466 29H2.75311C0.636928 29 -0.684332 26.7313 0.371094 24.9226L14.118 1.35853C15.176 -0.454484 17.8259 -0.451199 18.882 1.35853L32.6286 24.9226ZM16.5 20.0508C15.0445 20.0508 13.8646 21.2173 13.8646 22.6562C13.8646 24.0952 15.0445 25.2617 16.5 25.2617C17.9555 25.2617 19.1354 24.0952 19.1354 22.6562C19.1354 21.2173 17.9555 20.0508 16.5 20.0508ZM13.9979 10.6855L14.4229 18.3886C14.4428 18.7491 14.7443 19.0312 15.1094 19.0312H17.8907C18.2558 19.0312 18.5572 18.7491 18.5771 18.3886L19.0021 10.6855C19.0236 10.2961 18.71 9.96875 18.3156 9.96875H14.6843C14.2899 9.96875 13.9764 10.2961 13.9979 10.6855Z"
        fill="white"
      />
    </svg>
    <span class="float-left relative ml-2 top-[2px]">
      Error: {{ content }}</span
    >
  </div>
</template>

<style>
.error {
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
