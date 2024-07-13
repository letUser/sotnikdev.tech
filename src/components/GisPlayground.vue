<script setup lang="ts">
import Map from './gis/Map.vue'
</script>

<template>
  <div>
    <div class="playground-gis">
      <Map />
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
