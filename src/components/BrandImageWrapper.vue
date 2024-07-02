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
    <div class="brand-image-wrapper-jumbotron">
      <el-icon class="brand-image-wrapper-jumbotron-modal">
        <brand-image-modal :isDark="isDark" />
      </el-icon>
      <el-icon class="brand-image-wrapper-jumbotron-main">
        <brand-image-main :isDark="isDark" />
      </el-icon>
      <el-icon class="brand-image-wrapper-jumbotron-mobile">
        <brand-image-mobile :isDark="isDark" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.brand-image-wrapper {
  display: flex;
  justify-content: center;

  &-jumbotron {
    position: relative;
    transition: 0.3s ease-out;

    &-modal {
      position: absolute;
      width: 180px;
      height: 120px;
      font-size: 200px;
      left: 0px;
      bottom: 0px;
      z-index: 2;
      transition: 0.3s ease-out;
    }

    &-main {
      position: relative;
      width: 630px;
      height: 380px;
      font-size: 640px;
      z-index: 1;

      svg {
        height: 400px;
      }
    }

    &-mobile {
      position: absolute;
      width: 100px;
      height: 180px;
      font-size: 200px;
      right: 0px;
      bottom: 0px;
      z-index: 2;
      transition: 0.3s ease-out;
    }
  }
}
</style>
