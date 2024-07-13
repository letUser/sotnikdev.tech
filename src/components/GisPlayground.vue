<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Map')

const options = ['Map']
</script>

<template>
  <div class="fintech-playground">
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
