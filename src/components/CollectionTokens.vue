<template>
  <div class="w-full flex flex-col">
    <div class="flex-auto mb-8">
      <Button
        content="back"
        arrow="left"
        color="black"
        class="mb-4"
        @click="$emit('back')"
      />
    </div>
    <div class="flex-auto ml-8">
      <h1 class="text-5xl xl:text-6xl 2xl:text-7xl font-cal text-black">
        collection tokens
      </h1>
      <p class="text-lg md:text-xl 2xl:text-2xl font-josefin text-zinc-700">
        Below are displayed all tokens belonging to your collection.
      </p>
    </div>
    <div
      class="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-10"
    >
      <Token
        v-for="(token, key) in tokens"
        :key="key"
        :owner="token.owner"
        :tokenUri="token.token_uri"
        :evolv="evolv"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Token from "./Token.vue";
import Button from "./Button.vue";

export default {
  emits: ["back"],
  props: {
    tokens: {
      type: Object,
      required: true,
    },
    back: {
      type: Function,
      required: true,
    },
    evolv: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    Token,
    Button,
  },
  data() {
    return {};
  },
};
</script>
