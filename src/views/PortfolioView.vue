<script setup lang="ts">
import { useRoute } from 'vue-router'
import LeftMenu from '../components/LeftMenu.vue'
import VirtTable from '../components/fintech/VirtTable.vue'
import BIframe from '../components/fintech/BIframe.vue'
//import MapDemo from '../components/gis/MapDemo.vue'

// current route
const route = useRoute()
</script>

<template>
  <div class="section-portfolio-wrapper">
    <div class="section-portfolio">
      <LeftMenu />

      <div class="section-portfolio-playground">
        <div class="section-portfolio-playground-item">
          <VirtTable v-if="route.hash === '#performance'" />
          <!-- Use v-show here to cache HTML (temp solution). TODO: find out how we can save iframe instance after first v-if trigger -->
          <BIframe v-show="route.hash === '#bi-integration'" />
        </div>

        <!-- <div class="section-portfolio-playground-item">
          <Map v-if="route.hash === '#map'" />
        </div> -->
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
