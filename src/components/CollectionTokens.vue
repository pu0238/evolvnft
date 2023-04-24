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
          v-if="Object.keys(singleCollection.tokens).length > 0"
          :owner="selectedToken.owner"
          :tokenUri="selectedToken.token_uri"
          :evolv="icCollectionId"
        />
      </div>
    </div>
    <div
      class="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-10"
      v-if="singleCollection"
    >
      <Token
        v-for="(token, key) in singleCollection.tokens"
        :key="key"
        :owner="token.owner"
        :tokenUri="token.token_uri"
        :evolv="icCollectionId"
        @click="selectedToken = token"
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
      icCollectionId: false 
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
  },
  components: {
    Token,
    Button,
    MetadataEditor,
  },
  mounted() {
    this.selectedToken = this.singleCollection.tokens[0];
    this.icCollectionId = !!this.singleCollection.ic_collection_id;
  },
};
</script>
