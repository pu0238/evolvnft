<template>
  <div>
    <div class="w-full float-left mt-2 text-white text-xl md:text-2xl font-cal">
      <h3>Click to change metadata type:</h3>
    </div>
    <div class="float-left">
      <EvolvButton
        v-model:checked="checked"
        class="float-left select-none"
        v-on:change="() => setColectionOpen(checked)"
      />
    </div>
    <div class="float-left ml-2 mt-4 text-white text-lg font-josefin">
      <h3 v-if="!checked">Metadata is immutable</h3>
      <h3 v-else>Metadata is now mutable</h3>
    </div>
  </div>
</template>

<script lang="ts">
import EvolvButton from "./EvolvButton.vue";
import { computed, reactive } from "vue";
import { collectionEvolvMetadata,  } from "../state/collectionState";
import { useStore } from "@nanostores/vue";

export default {
  data() {
    return {
      checked: false,
      limit: "",
    };
  },
  methods: {
    setColectionOpen(isOpen: boolean) {
      collectionEvolvMetadata.set(isOpen);
    },
  },
  mounted() {
    this.checked = this.collectionEvolvMetadataValue;
  },
  components: {
    EvolvButton,
  },
  setup(props) {
    props = reactive(props);
    const $collectionEvolvMetadata = useStore(collectionEvolvMetadata);
    return {
      collectionEvolvMetadataValue: computed(() => $collectionEvolvMetadata.value),
    };
  },
};
</script>
