<script setup lang="ts">
import VirtTable from './fintech/VirtTable.vue'
import BIframe from './fintech/BIframe.vue'
</script>

<template>
  <div>
    <div class="playground-fintech">
      <VirtTable />

      <BIframe />
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
