<template>
  <div>
    <div class="w-full float-left mt-2 text-white text-xl md:text-2xl font-cal">
      <h3>Click to lock collection:</h3>
    </div>
    <div class="w-full float-left">
      <LockButton
        v-model:checked="checked"
        class="float-left select-none"
        v-on:change="() => setColectionOpen(checked)"
      />
      <InputArea
        class="ml-4 float-left"
        placeholder="10"
        heading="Token limit:"
        :disabled="!checked"
        v-model:modelValue="limit"
        v-on:change="() => setTokenLimit(limit)"
      />
    </div>
    <div class="w-full float-left mt-2 text-white text-lg font-josefin">
      <h3 v-if="!checked">Collection is open</h3>
      <h3 v-else>Collection is closed</h3>
    </div>
  </div>
</template>

<script lang="ts">
import LockButton from "./LockButton.vue";
import InputArea from "./InputArea.vue";
import { computed, reactive } from "vue";
import { isColectionClosed, tokenLimit } from "../state/collectionState";
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
      isColectionClosed.set(isOpen);
    },
    setTokenLimit(limit: string) {
      tokenLimit.set(limit);
    },
  },
  mounted() {

    this.checked = this.isColectionClosedValue;
    this.limit = this.tokenLimitValue;
  },
  components: {
    LockButton,
    InputArea,
  },
  setup(props) {
    props = reactive(props);
    const $isColectionClosed = useStore(isColectionClosed);
    const $tokenLimit = useStore(tokenLimit);
    return {
      isColectionClosedValue: computed(() => $isColectionClosed.value),
      tokenLimitValue: computed(() => $tokenLimit.value),
    };
  },
};
</script>
