<script setup lang="ts">
import { useRoute } from 'vue-router'
import VirtTable from './fintech/VirtTable.vue'
import BIframe from './fintech/BIframe.vue'

// current route
const route = useRoute()
</script>

<template>
  <div>
    <div class="playground-fintech">
      <VirtTable v-if="route.hash === '#performance'" />
      <!-- Use v-show here to cache HTML (temp solution) TODO: find out how we can save iframe instance after first v-if trigger -->
      <BIframe v-show="route.hash === '#bi-integration'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground-fintech {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  &-segments {
    &-wrapper {
      border-top: 1px solid var(--el-border-color);
    }
  }
}

@media screen and (min-width: 1280px) {
  .playground-fintech {
    &-segments {
      width: 50%;

      &-wrapper {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
