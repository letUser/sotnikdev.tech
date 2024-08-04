<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MostlyCloudy, Money, Location } from '@element-plus/icons-vue'

// current route
const route = useRoute()
const router = useRouter()

// if there is no hash - set default
if (!route.hash?.length) {
  router.replace('#ai')
}

// array that contains indexes of currently active sub-menus
const opened = ['cloud', 'fintech', 'gis']

// whether the menu is collapsed (available only in vertical mode)
const isCollapse = ref(false)

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>
</script>

<template>
  <el-menu
    class="left-menu"
    :default-active="route.hash"
    :default-openeds="opened"
    :collapse="isCollapse"
    @select="$emit('selected')"
    :collapse-transition="!isMobile"
    router
  >
    <el-sub-menu index="cloud">
      <template #title>
        <el-icon><mostly-cloudy /></el-icon>
        <span class="left-menu-title">Cloud Native</span>
      </template>
      <el-menu-item index="#ai">Artificial intelligence (AI)</el-menu-item>
      <el-menu-item index="#paas">PaaS</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="fintech">
      <template #title>
        <el-icon><money /></el-icon>
        <span class="left-menu-title">FinTech</span>
      </template>
      <el-menu-item index="#perf">Performance</el-menu-item>
      <el-menu-item index="#bi">Business intelligence (BI)</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="gis">
      <template #title>
        <el-icon><location /></el-icon>
        <span class="left-menu-title">GIS</span>
      </template>
      <el-menu-item index="#map">Map</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.left-menu {
  overflow-y: auto;
  z-index: var(--pre-max-z-index);

  &-title {
    font-weight: bolder;
  }
}
</style>
