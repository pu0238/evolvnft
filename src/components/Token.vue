<template>
  <div
    class="bg-black float-left px-8 py-4 flex flex-col justify-items-center rounded-xl w-60 relative"
    :class="{ 'cursor-pointer': evolv }"
    @click="$emit('click', metadata)"
  >
    <img
      class="w-32 mx-auto mb-2"
      :src="metadata ? metadata.image : '/evolvnft-collection-logo.svg'"
      draggable="false"
    />
    <img
      class="w-10 mx-auto mb-2 absolute right-3 top-3"
      :class="{ hidden: !evolv }"
      src="/edit-icon.svg"
      draggable="false"
    />
    <p class="text-zinc-400 font-josefin text-xs">Token name:</p>
    <h3 class="text-white font-cal text-lg text-center">
      {{ metadata ? metadata.name : "Loading metadata..." }}
    </h3>
    <p class="text-zinc-400 font-josefin text-xs">Owner:</p>
    <p class="text-zinc-200 font-josefin text-center">
      {{ owner.slice(0, 11) }}...{{
        owner.slice(owner.length - 6, owner.length)
      }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      metadata: undefined as any,
    };
  },
  emits: ["click"],
  props: {
    evolv: {
      type: Number,
      default: false,
      required: false,
    },
    key: {
      type: String,
      default: "0",
      required: true,
    },
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
  },
  methods: {
    async getMetadata() {
      const response = await fetch(this.tokenUri);
      const data = await response.json();
      return data;
    },
  },
  mounted() {
    this.getMetadata().then((data) => {
      this.metadata = data;
    });
  },
};
</script>
