<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import { useDark } from '@vueuse/core'
import BrandImageMain from './icons/BrandImageMain.vue'
import BrandImageModal from './icons/BrandImageModal.vue'
import BrandImageMobile from './icons/BrandImageMobile.vue'
import imageLight from '@/assets/mob-brand-image-light.png'
import imageDark from '@/assets/mob-brand-image-dark.png'

// dark/light theme util
const isDark = useDark() //true or false

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>
</script>

<template>
  <div class="brand-image-wrapper">
    <div v-if="!isMobile" class="brand-image-wrapper-jumbotron">
      <!-- If not mobile version -->

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
    <div v-else class="brand-image-wrapper-mobile">
      <!-- If mobile version -->
      <img
        class="brand-image-wrapper-mobile-image"
        :src="isDark ? imageDark : imageLight"
        alt="brand image"
      />
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

  &-mobile {
    &-image {
      width: 100%;
    }
  }
}
</style>
