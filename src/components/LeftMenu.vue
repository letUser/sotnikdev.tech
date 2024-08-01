<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
        <span class="left-menu-title">Cloud Native</span>
      </template>
      <el-menu-item index="#ai">Artificial intelligence (AI)</el-menu-item>
      <el-menu-item index="#paas">PaaS</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="fintech">
      <template #title>
        <span class="left-menu-title">FinTech</span>
      </template>
      <el-menu-item index="#perf">Performance</el-menu-item>
      <el-menu-item index="#bi">Business intelligence (BI)</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="gis">
      <template #title>
        <span class="left-menu-title">GIS</span>
      </template>
      <el-menu-item index="#map">Map</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.left-menu {
  width: var(--left-menu-width);

  &-title {
    font-weight: bolder;
  }
}
</style>
