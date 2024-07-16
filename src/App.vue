<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "app",
  components: {
    RouterView,
  },
  setup() {

    onBeforeMount(() => {
      /**
       * Overrides the layout config using saved data from localStorage
       * remove this to use static config (@/core/config/DefaultLayoutConfig.ts)
       */
    });

    onMounted(() => {
      nextTick(() => {

      });
    });
  },
});
</script>

<style lang="scss">

#app {
  display: contents;
}
</style>
