<script setup lang="ts">
import { useDark } from '@vueuse/core'
import BrandImageMain from './icons/BrandImageMain.vue'
import BrandImageModal from './icons/BrandImageModal.vue'
import BrandImageMobile from './icons/BrandImageMobile.vue'

// dark/light theme util
const isDark = useDark() //true or false
</script>

<template>
  <div class="brand-image-wrapper">
    <el-icon class="brand-image-wrapper-main">
      <brand-image-main :isDark="isDark" />
    </el-icon>
    <el-icon class="brand-image-wrapper-modal">
      <brand-image-modal :isDark="isDark" />
    </el-icon>
    <el-icon class="brand-image-wrapper-mobile">
      <brand-image-mobile :isDark="isDark" />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.brand-image-wrapper {
  display: flex;
  justify-content: center;
  animation: fade 0.5s;

  &-main {
    position: relative;
    width: 700px;
    height: 450px;
    font-size: 700px;

    svg {
      height: 450px;
    }
  }

  &-modal {
    position: relative;
    width: 700px;
    height: 200px;
    font-size: 700px;

    svg {
      height: 150px;
    }
  }

  &-mobile {
    position: relative;
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
</style>
