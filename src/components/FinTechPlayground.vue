<script setup lang="ts">
import VirtTable from './fintech/VirtTable.vue'
import BIframe from './fintech/BIframe.vue'

import { ref } from 'vue'

const value = ref('BI integration')

const options = ['BI integration', 'Performance', 'Option 3', 'Option 4']
</script>

<template>
  <div class="fintech-playground">
    <BIframe v-if="value === 'BI integration'" />

    <VirtTable v-if="value === 'Performance'" />

    <div class="fintech-playground-segments-wrapper">
      <el-segmented class="fintech-playground-segments" v-model="value" :options="options" block />
    </div>
  </div>
</template>

<style scoped lang="scss">
.fintech-playground {
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
  .fintech-playground {
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
