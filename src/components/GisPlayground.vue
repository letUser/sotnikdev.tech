<script setup lang="ts">
import { ref } from 'vue'
import Map from './gis/Map.vue'

const value = ref('Map')

const options = ['Map']
</script>

<template>
  <div>
    <div class="playground-gis">
      <Map v-show="value === 'Map'" />

      <div class="playground-gis-segments-wrapper">
        <el-segmented class="playground-gis-segments" v-model="value" :options="options" block />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground-gis {
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
  .playground-gis {
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
