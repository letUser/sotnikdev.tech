<script setup lang="ts"></script>

<template>
  <div class="BI">
    <iframe
      class="BI-frame"
      title="BI-integration"
      src="https://datalens.yandex/lbqnpzipxjbs8"
      loading="lazy"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.BI {
  width: 100%;
  height: 100%;
  padding: 24px;

  &-frame {
    width: 100%;
    min-height: 100%;
    border-radius: var(--el-border-radius-base);
  }
}
</style>
