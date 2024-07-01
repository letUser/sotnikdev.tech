<script setup lang="ts">
import { useDark } from '@vueuse/core'
import BrandImage from './icons/BrandImage.vue'

// dark/light theme util
const isDark = useDark() //true or false
</script>

<template>
  <div class="brand-image">
    <el-icon class="brand-image-wrapper">
      <brand-image :isDark="isDark" />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.brand-image {
  display: flex;
  justify-content: center;
  animation: fade 0.5s;

  &-wrapper {
    width: 700px;
    height: 450px;
    font-size: 700px;

    svg {
      height: 450px;
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
