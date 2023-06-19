<template>
  <div>
    <input
      id="inpEvolv"
      type="checkbox"
      :checked="checked"
      @input="(event: any) => $emit('update:checked', event.target?.checked)"
    />
    <label class="btn-metadata" for="inpEvolv">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0V34H34V0H0ZM4.25 4.25H29.75V17L25.5 12.75L21.25 17L29.75 25.5V29.75H25.5L8.5 12.75L4.25 17V4.25Z"
          fill="white"
        />
        <path
          class="pencil"
          d="M19.984 8.5L17.9411 10.5429L22.0269 14.6287L24.0698 12.5858L19.984 8.5ZM15.8982 12.5858L7.72656 20.7574V24.8432H11.8124L19.984 16.6716L15.8982 12.5858Z"
          fill="black"
        />
      </svg>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: "EvolvButton",
  emits: ["update:checked"],
  props: {
    checked: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style>
.btn-metadata {
  display: inline-block;
  background: #6366f1;
  border: 4px solid #6366f1;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  padding: 11px 0 0 11px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}
.btn-lock svg {
  fill: none;
  transform: translate3d(0, 0, 0);
  position: absolute;
}
.btn-lock svg .bling {
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 3;
  stroke-dashoffset: 15;
  transition: all 0.3s ease;
}
.btn-lock svg .lock {
  stroke: #fff;
  stroke-width: 4;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 36;
  transition: all 0.3s ease;
}
.btn-lock svg .lockb {
  fill: #fff;
  fill-rule: evenodd;
  clip-rule: evenodd;
  transform: rotate(8deg);
  transform-origin: 14px 20px;
  transition: all 0.3s ease;
}
#inpEvolv {
  display: none;
}
#inpEvolv:checked + label svg .pencil {
  opacity: 1;
}
#inpEvolv + label svg .pencil {
  transition: all 0.3s ease;
  opacity: 0;
}
</style>
