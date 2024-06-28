<script setup lang="ts">
import BrandImage from './icons/BrandImage.vue'
</script>

<template>
  <div class="brand-image">
    <el-icon class="brand-image-wrapper">
      <brand-image />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.brand-image {
  display: flex;
  justify-content: center;
  animation: fade 0.5s;

  &-wrapper {
    width: 653px;
    height: 385px;
    font-size: 653px;

    svg {
      height: 385px;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
