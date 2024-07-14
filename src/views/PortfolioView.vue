<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeftMenu from '../components/LeftMenu.vue'
import SaasComponent from '../components/cloud/SaasComponent.vue'
import PaasComponent from '../components/cloud/PaasComponent.vue'
import VirtTable from '../components/fintech/VirtTable.vue'
import BIframe from '../components/fintech/BIframe.vue'
import MapComponent from '../components/gis/MapComponent.vue'

// current route
const route = useRoute()

// menu dictionary
const menuDict: { [index: string]: string } = {
  '#saas': 'cloud',
  '#paas': 'cloud',
  '#performance': 'fintech',
  '#bi-integration': 'fintech',
  '#map': 'gis'
}
</script>

<template>
  <div class="section-portfolio-wrapper">
    <div class="section-portfolio">
      <LeftMenu />

      <div class="section-portfolio-playground">
        <div v-if="menuDict[route.hash] === 'cloud'" class="section-portfolio-playground-item">
          <SaasComponent v-show="route.hash === '#saas'" />
          <PaasComponent v-show="route.hash === '#paas'" />
        </div>

        <div v-if="menuDict[route.hash] === 'fintech'" class="section-portfolio-playground-item">
          <VirtTable v-show="route.hash === '#performance'" />
          <!-- TODO: find out how we can save iframe instance and do not reload data every v-if trigger -->
          <BIframe v-show="route.hash === '#bi-integration'" />
        </div>

        <div v-if="menuDict[route.hash] === 'gis'" class="section-portfolio-playground-item">
          <MapComponent v-if="route.hash === '#map'" />
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
    padding: var(--page-vertical-padding) var(--page-horizontal-padding);

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

    @media screen and (min-width: 1280px) {
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
