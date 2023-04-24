<template>
  <div
    class="bg-black p-8 sm:p-12 w-72 sm:min-w-[30rem] md:w-[40rem] lg:w-auto lg:p-16 rounded-[3rem] xl:min-h-[32rem] flex-col lg:flex lg:flex-row float-left"
  >
    <div class="lg:max-w-[20rem] lg:mr-16">
      <img class="w-48 mx-auto" :src="metadata.image" draggable="false" />
      <div class="text-white">
        <p class="text-zinc-400 font-josefin text-xs">Token name:</p>
        <h1 class="text-3xl font-cal">{{ metadata.name }}</h1>
        <p class="text-zinc-400 font-josefin text-xs mt-1">Owner:</p>
        <p class="text-zinc-200 font-josefin">
          {{ owner.slice(0, 11) }}...{{
            owner.slice(owner.length - 6, owner.length)
          }}
        </p>
        <p class="text-zinc-400 font-josefin text-xs mt-1">Description:</p>
        <p class="text-md font-josefin">{{ metadata.description }}</p>
        <Uploader
          v-if="evolv"
          class="mt-8 w-full"
          heading="drop new metadata:"
          :acceptedTypes="jsonTypes"
          :maxFiles="1"
          @acceptFiles="handdleAcceptFiles"
        />
      </div>
    </div>
    <div
      class="bg-zinc-900 p-4 rounded-2xl w-auto overflow-auto h-full max-h-[25rem] lg:max-h-[35rem] lg:w-[35rem] mt-8"
    >
      <code class="text-white">
        <pre>{{ JSON.stringify(metadata, null, " ") }}</pre>
      </code>
    </div>
  </div>
</template>

<script lang="ts">
import Uploader from "./Uploader.vue";

export default {
  data() {
    return { metadata: {} as any, jsonTypes: ["application/json"] };
  },
  components: {
    Uploader,
  },
  props: {
    owner: {
      type: String,
      default:
        "archway1cf0vx6855x9wfgfpdvu356zz4ufctfd2a58g84ntxywr298qa0gqryr4cv",
      required: true,
    },
    tokenUri: {
      type: String,
      default:
        "https://www.arweave.net/IWufcK8d3BZKyVM7iZhkKMvPlXcLvQWKoE0nWM4MCiw",
      required: true,
    },
    evolv: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    async handdleAcceptFiles(acceptedFiles: any) {
      console.log(acceptedFiles);
    },
    async getMetadata(url: string) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
  },
  mounted() {
    this.getMetadata(this.tokenUri).then((data) => {
      this.metadata = data;
    });
  },
  watch: {
    tokenUri: function (newVal) {
      this.getMetadata(newVal).then((data) => {
        this.metadata = data;
      });
    },
  },
};
</script>
