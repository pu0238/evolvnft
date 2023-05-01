<template>
  <div
    class="bg-black float-left p-8 sm:p-12 md:p-16 rounded-[3rem] xl:min-h-[32rem]"
  >
    <div class="float-left w-full">
      <div class="lg:max-w-md xl:max-w-lg float-left my-8 w-full">
        <h2
          class="text-4xl md:text-5xl font-cal"
          :class="{
            'text-black': textColor === 'black',
            'text-white': textColor === 'white',
          }"
        >
          <span class="text-indigo-500">create your</span> own decentralized
          <span class="text-indigo-500">token</span>
        </h2>
        <div class="my-2 lg:my-8">
          <p
            class="text-md md:text-lg lg:text-xl font-josefin"
            :class="{
              'text-zinc-700': textColor === 'black',
              'text-zinc-300': textColor === 'white',
            }"
          >
            hey let's go through a few steps together to create your dream
            token.
            <br />
            <br />
            do not hesitate, choose the type of token you are interested in and
            start your decentralized adventure!
          </p>
        </div>
      </div>
      <img
        draggable="false"
        class="hidden md:block lg:block w-[20rem] md:w-[18rem] lg:w-[23rem] xl:w-[30rem] my-8 lg:my-12 mx-auto"
        src="/collection-creation-header.png"
        alt="Sample collection image"
      />
    </div>
    <div class="w-full float-left">
      <Button class="float-right" content="next step" arrow="right" @click="$emit('next')"/>
    </div>
  </div>
</template>

<script lang="ts">
import SecondSectionLeft from "./SecondSectionLeft.vue";
import HeaderSubtitle from "./HeaderSubtitle.vue";
import Button from "./Button.vue";
import CollectionBaner from "./CollectionBaner.vue";
import SecondSectionTitle from "./SecondSectionTitle.vue";
import { reactive } from "vue";

export default {
  components: {
    SecondSectionLeft,
    HeaderSubtitle,
    Button,
    CollectionBaner,
    SecondSectionTitle,
  },
  props: {
    textColor: {
      type: String,
      default: "white",
      required: false,
      validator: (color: string) => ["white", "black"].includes(color),
    },
    next: {
      type: Function,
    },
  },
  emits: ['next'],
  setup(props) {
    props = reactive(props);
    return {};
  },
};
</script>
