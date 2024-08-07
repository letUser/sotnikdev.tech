<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'petite-vue-i18n'
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

// use translation
const { t } = useI18n({ useScope: 'global' })

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

/**
 * Track visibility mode to handle overflow-y block
 */
watch(isMobile, (mode: boolean) => {
  if (!mode) changeMenuVisible(false)
})

// flag for mobile menu opening
const isMenuOpened = ref(false)

// flag for menu collapse state
const isMenuCollapsed = ref(false)
// get local storage menu data
const storageData = localStorage.getItem('sotnikdev.tech:menu-collapsed')
if (!storageData) {
  isMenuCollapsed.value = window.innerWidth < 1200
} else {
  isMenuCollapsed.value = Boolean(Number(storageData))
}

/**
 * Change menu visibility
 */
const changeMenuVisible = (val: boolean) => {
  isMenuOpened.value = val

  const body = document.getElementsByClassName('content-view')[0] as HTMLElement

  if (body) {
    if (isMenuOpened.value) {
      body.classList.add('no-overflow-y')
    } else {
      body.classList.remove('no-overflow-y')
    }
  }
}
</script>

<template>
  <div class="section-portfolio-wrapper">
    <div v-if="isMobile" class="section-portfolio-mobile-header filtered-background">
      <div
        v-show="!isMenuOpened"
        class="section-portfolio-mobile-header-bttn"
        @click="changeMenuVisible(true)"
      >
        <el-icon><menu-icon /></el-icon> <span>{{ t('menu') }}</span>
      </div>
      <div
        v-show="isMenuOpened"
        class="section-portfolio-mobile-header-bttn"
        @click="changeMenuVisible(false)"
      >
        <el-icon color="#606266"><close-bold /></el-icon> <span>{{ t('close') }}</span>
      </div>
    </div>

    <div class="section-portfolio">
      <LeftMenu
        v-if="!isMobile || isMenuOpened"
        class="section-portfolio-menu"
        :isMenuCollapsed="isMenuCollapsed"
        @selected="isMenuOpened = !isMenuOpened"
        @collapseTriggered="(val: boolean) => (isMenuCollapsed = val)"
      />

      <div
        :class="{
          'section-portfolio-playground': true,
          expanded: !isMobile && isMenuCollapsed
        }"
      >
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
  justify-content: space-between;
  height: 100%;

  &-wrapper {
    height: calc(100dvh - var(--nav-bar-height));
  }

  &-mobile-header {
    position: fixed;
    display: flex;
    width: 100%;
    padding: 12px 28px;
    font-size: 16px;
    border-bottom: 1px solid var(--el-border-color);
    z-index: var(--pre-max-z-index);

    &-bttn {
      display: flex;
      align-items: center;

      > i {
        font-size: 20px;
        margin-right: 8px;
      }
    }
  }

  &-playground {
    width: calc(100% - var(--left-menu-width));
    height: 100%;
    padding: var(--portfolio-vertical-padding) var(--page-horizontal-padding);
    transition: width 0.5s ease;

    &.expanded {
      width: calc(100% - var(--left-menu-width-collapsed));
      transition: none;
    }

    &-item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      overflow: auto;
      border: 1px solid var(--el-border-color);
      border-radius: var(--el-border-radius-base);
    }
  }
}

@media screen and (max-width: 770px) {
  .section-portfolio {
    &-playground {
      padding: calc(var(--mobile-menu-bar-height) + 24px) var(--page-padding-small) 30px;
      width: 100%;
      transition: none;
    }
  }
}

@media screen and (min-width: 770px) and (max-width: 1200px) {
  .section-portfolio {
    &-playground {
      padding: var(--page-padding-small);
    }
  }
}
</style>
