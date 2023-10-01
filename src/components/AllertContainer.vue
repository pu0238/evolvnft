<template>
  <div class="fixed z-50 bottom-10 right-10 grid justify-items-end">
    <ErrorMessage v-for="error in errors" :content="error" />
    <InfoMessage v-for="info in infos" :content="info" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@nanostores/vue';
import ErrorMessage from './ErrorMessage.vue';
import InfoMessage from './InfoMessage.vue';
import { errorMessage, infoMessage } from '../state/error';
import { computed } from 'vue';
export default {
  components: { ErrorMessage, InfoMessage },
  data() {
    return {
      errors: [] as string[],
      infos: [] as string[],
      duration: 4000,
    };
  },
  methods: {
    handleError(errorMsg: string) {
      if (errorMsg === '') return;
      this.errors.push(errorMsg);
      setTimeout(() => this.errors.shift(), this.duration);
    },
    handleInfo(infoMsg: string) {
      if (infoMsg === '') return;
      this.infos.push(infoMsg);
      setTimeout(() => this.infos.shift(), this.duration);
    },
  },
  mounted() {
    errorMessage.subscribe(this.handleError);
    infoMessage.subscribe(this.handleInfo);
  },
  setup() {
    const $errorMessage = useStore(errorMessage);
    const $infoMessage = useStore(infoMessage);

    return {
      errorMessage: computed(() => $errorMessage.value),
      infoMessage: computed(() => $infoMessage.value),
    };
  },
};
</script>
