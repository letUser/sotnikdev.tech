<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// current route
const route = useRoute()
const router = useRouter()

// if there is no hash add default
if (!route.hash?.length) {
  router.replace('#performance')
}

const isCollapse = ref(false)

const onSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <el-menu :default-active="route.hash" :collapse="isCollapse" @select="onSelect">
    <el-sub-menu index="1">
      <template #title>
        <span>Cloud Native SaaS & PaaS</span>
      </template>
      <el-menu-item index="#saas">SaaS</el-menu-item>
      <el-menu-item index="#paas">PaaS</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <span>FinTech & Blockchain</span>
      </template>
      <el-menu-item index="#performance">Performance</el-menu-item>
      <el-menu-item index="#bi-integration">BI integration</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <span>GIS & Spatial systems</span>
      </template>
      <el-menu-item index="#map">Map</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss"></style>
