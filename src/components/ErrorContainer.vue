<template>
  <div class="fixed bottom-10 right-10 grid justify-items-end">
    <ErrorMessage v-for="error in errors" :content="error" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@nanostores/vue';
import ErrorMessage from './ErrorMessage.vue';
import { errorMessage } from '../state/error';
import { computed } from 'vue';
export default {
  components: { ErrorMessage },
  data() {
    return {
      errors: [] as string[],
      duration: 4000,
    };
  },
  methods: {
    removeLatestElement() {
      this.errors.shift();
    },
    hideError() {
      setTimeout(this.removeLatestElement, this.duration);
    },
  },
  mounted() {
    errorMessage.subscribe((msg) => {
      if (msg === '') return;
      this.errors.push(msg);
      this.hideError();
    });
  },
  setup() {
    const $errorMessage = useStore(errorMessage);

    return {
      errorMessage: computed(() => $errorMessage.value),
    };
  },
};
</script>
