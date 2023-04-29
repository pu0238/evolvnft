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
    <div class="flex-auto ml-8 pb-4">
      <h1 class="text-5xl xl:text-6xl 2xl:text-7xl font-cal text-black">
        collection tokens
      </h1>
      <p class="text-lg md:text-xl 2xl:text-2xl font-josefin text-zinc-700">
        Below are displayed all tokens belonging to your collection.
      </p>
    </div>
    <div class="w-full flex">
      <div class="mx-auto flex">
        <MetadataEditor
          v-if="selectedToken && singleCollection"
          :owner="selectedToken.owner"
          :tokenUri="selectedToken.token_uri"
          :selectedToken="selectedToken"
          :evolv="singleCollection?.ic_collection_id"
          :selectedMetadata="selectedMetadata"
          @evolved="$forceUpdate()"
        />
      </div>
    </div>
    <div
      class="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-10"
      v-if="Object.keys(singleCollection.tokens).length > 0"
    >
      <Token
        v-for="(token, key) in singleCollection.tokens"
        :key="key"
        :owner="token?.owner"
        :tokenUri="token?.token_uri"
        :evolv="singleCollection?.ic_collection_id"
        @click="(matadata: any) => selectToken(matadata, token)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Token from "./Token.vue";
import Button from "./Button.vue";
import MetadataEditor from "./MetadataEditor.vue";

export default {
  data() {
    return {
      selectedToken: {} as any,
      tokens: {},
      selectedMetadata: {},
    };
  },
  emits: ["back"],
  props: {
    singleCollection: {
      type: Object,
      required: true,
    },
    back: {
      type: Function,
    },
    collectionTokens: {
      type: String,
    },
  },
  components: {
    Token,
    Button,
    MetadataEditor,
  },
  methods: {
    selectToken(metadata: any, token: any) {
      this.selectedToken = token
      this.selectedMetadata = metadata
    },
  },
  mounted() {
    if (this.collectionTokens) {
      console.log(123, JSON.parse(this.collectionTokens));
      this.tokens = JSON.parse(this.collectionTokens);
      console.log(this.singleCollection.tokens["1"]);
    }

    this.selectedToken = this.singleCollection.tokens["1"];
  },
};
</script>
