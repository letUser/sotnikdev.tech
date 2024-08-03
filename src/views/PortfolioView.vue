<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import { CloseBold } from '@element-plus/icons-vue'
import type MenuDict from '../interface/MenuDict'
import MenuIcon from '../components/icons/MenuIcon.vue'
import LeftMenu from '../components/LeftMenu.vue'
import AiComponent from '../components/cloud/AiComponent.vue'
import PaasComponent from '../components/cloud/PaasComponent.vue'
import VirtTable from '../components/fintech/VirtTable.vue'
import BIframe from '../components/fintech/BIframe.vue'
import MapComponent from '../components/gis/MapComponent.vue'

// current route
const route = useRoute()

// menu dictionary
const menuDict: MenuDict = {
  '#ai': AiComponent,
  '#paas': PaasComponent,
  '#perf': VirtTable,
  '#bi': BIframe,
  '#map': MapComponent
}

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>

const isMenuOpened = ref(false)
</script>

<template>
  <div class="section-portfolio-wrapper">
    <div v-if="isMobile" class="section-portfolio-mobile-header">
      <div
        v-show="!isMenuOpened"
        class="section-portfolio-mobile-header-bttn"
        @click="isMenuOpened = !isMenuOpened"
      >
        <el-icon><menu-icon /></el-icon> <span>Menu</span>
      </div>
      <div
        v-show="isMenuOpened"
        class="section-portfolio-mobile-header-bttn"
        @click="isMenuOpened = !isMenuOpened"
      >
        <el-icon color="#606266"><close-bold /></el-icon> <span>Close</span>
      </div>
    </div>

    <div class="section-portfolio">
      <LeftMenu v-show="!isMobile || isMenuOpened" class="section-portfolio-menu fullscreen" />

      <div class="section-portfolio-playground">
        <div class="section-portfolio-playground-item">
          <keep-alive :max="10">
            <component :is="menuDict[route.hash]" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-portfolio {
  text-align: center;
  display: flex;

  &-mobile-header {
    position: fixed;
    display: flex;
    width: 100%;
    padding: 12px 28px;
    font-size: 16px;
    border-bottom: 1px solid var(--el-border-color);

    &-bttn {
      display: flex;
      align-items: center;

      > i {
        font-size: 20px;
        margin-right: 8px;
      }
    }
  }

  &-menu {
    z-index: 1;
    width: var(--left-menu-width);
  }

  &-playground {
    width: calc(100vw - var(--left-menu-width));
    height: calc(100vh - var(--nav-bar-height));
    padding: var(--portfolio-vertical-padding) var(--page-horizontal-padding);

    &-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      border: 1px solid var(--el-border-color);
      border-radius: var(--el-border-radius-base);
    }
  }
}

@media screen and (max-width: 764px) {
  .section-portfolio {
    &-menu {
      width: 100%;
      border-right: none;

      &.fullscreen {
        position: fixed;
        top: calc(var(--nav-bar-height) + 45px);
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--el-bg-color);
      }
    }

    &-playground {
      width: 100%;
      padding: calc(var(--portfolio-vertical-padding) + 45px) 10px 30px;
    }
  }
}
</style>
