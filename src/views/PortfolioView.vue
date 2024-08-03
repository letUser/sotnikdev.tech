<script setup lang="ts">
import { useRoute } from 'vue-router'
import type MenuDict from '../interface/MenuDict'
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
</script>

<template>
  <div class="section-portfolio-wrapper">
    <div class="section-portfolio">
      <LeftMenu />

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

      &-segments {
        &-wrapper {
          border-top: 1px solid var(--el-border-color);
        }
      }
    }

    @media screen and (min-width: 768px) {
      .playground {
        &-item {
          &-segments {
            width: 50%;

            &-wrapper {
              display: flex;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
