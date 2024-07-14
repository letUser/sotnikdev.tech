<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// current route
const route = useRoute()
const router = useRouter()

// if there is no hash - set default
if (!route.hash?.length) {
  router.replace('#performance')
}

// array that contains indexes of currently active sub-menus
const opened = ['cloud', 'fintech', 'gis']

// whether the menu is collapsed (available only in vertical mode)
const isCollapse = ref(false)

const onSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <el-menu
    class="left-menu"
    :default-active="route.hash"
    :default-openeds="opened"
    :collapse="isCollapse"
    @select="onSelect"
  >
    <el-sub-menu index="cloud">
      <template #title>
        <span>Cloud Native SaaS & PaaS</span>
      </template>
      <el-menu-item index="#saas">SaaS</el-menu-item>
      <el-menu-item index="#paas">PaaS</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="fintech">
      <template #title>
        <span>FinTech & Blockchain</span>
      </template>
      <el-menu-item index="#performance">Performance</el-menu-item>
      <el-menu-item index="#bi-integration">BI integration</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="gis">
      <template #title>
        <span>GIS & Spatial systems</span>
      </template>
      <el-menu-item index="#map">Map</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.left-menu {
  width: var(--left-menu-width);
}
</style>
