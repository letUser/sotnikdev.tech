<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DArrowRight, MostlyCloudy, Money, Location } from '@element-plus/icons-vue'

const props = defineProps<{ isMenuCollapsed: boolean }>()

const emit = defineEmits<{
  selected: [undefined]
  collapseTriggered: [boolean]
}>()

// current route
const route = useRoute()
const router = useRouter()

// if there is no hash - set default
if (!route.hash?.length) {
  router.replace('#ai')
}

// ref to menu's expose
const menu: Ref<{ open: (index: string, indexPath: string[]) => void }> = ref({ open: () => {} })

// array that contains indexes of currently active sub-menus
const opened = ['cloud', 'fintech', 'gis']

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>

// whether the menu is collapsed
const isCollapse = ref(props.isMenuCollapsed)

/**
 * Handler for collapse trigger click
 */
const collapseHandle = () => {
  isCollapse.value = !isCollapse.value

  // open all sub menus
  if (menu?.value) opened.forEach((i) => menu.value.open(i, [i]))

  if (!isCollapse.value) {
    // handle animations
    setTimeout(() => emit('collapseTriggered', isCollapse.value), 200)
  } else {
    emit('collapseTriggered', isCollapse.value)
  }

  // set 1 if true and 0 if false
  const storageResult = Number(isCollapse.value)?.toString() ?? '0'
  // save to the local storage
  localStorage.setItem('sotnikdev.tech:menu-collapsed', storageResult)
}
</script>

<template>
  <el-menu
    ref="menu"
    :class="{ 'left-menu': true, fullscreen: isMobile }"
    :default-active="route.hash"
    :default-openeds="opened"
    :collapse="!isMobile && isCollapse"
    @select="emit('selected', undefined)"
    router
  >
    <el-button
      v-if="!isMobile"
      class="left-menu-expand-trigger"
      @click="collapseHandle"
      :title="isCollapse ? 'Expand' : 'Collapse'"
    >
      <el-icon :class="{ 'to-left': !isCollapse }"><DArrowRight /></el-icon>
    </el-button>

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
      <el-menu-item index="#bi">Business intelligence (BI)</el-menu-item>
      <el-menu-item index="#perf">Performance</el-menu-item>
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
  overflow-x: hidden;
  z-index: var(--pre-max-z-index);
  width: var(--left-menu-width);
  margin-top: var(--page-horizontal-padding);
  margin-left: 20px;
  --el-menu-border-color: none;
  --el-menu-hover-bg-color: none;

  .el-menu-item {
    &:hover {
      color: var(--el-color-primary);
    }

    &.is-active {
      background-color: rgb(from var(--el-color-primary) r g b / 0.1);
      border-radius: var(--el-border-radius-base);
    }
  }

  &.el-menu--collapse {
    width: var(--left-menu-width-collapsed);
  }

  &-expand-trigger {
    width: 100%;
    padding: var(--page-padding-small);
    margin-bottom: var(--page-padding-small);

    .to-left {
      transform: rotateZ(180deg);
    }
  }

  &-title {
    font-weight: bolder;
  }
}

@media screen and (max-width: 770px) {
  .left-menu {
    border-right: none;
    transition: none;
    margin-top: 0;
    margin-left: 0;

    &.fullscreen {
      width: 100vw;
      position: fixed;
      top: calc(var(--nav-bar-height) + var(--mobile-menu-bar-height));
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--el-bg-color);
      padding-left: 8px;
    }
  }
}

@media screen and (min-width: 770px) and (max-width: 1200px) {
  .left-menu {
    margin-top: var(--page-padding-small);
    margin-left: 18px;
  }
}
</style>
