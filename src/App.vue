<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import CookieAgreement from './components/CookieAgreement.vue'
import LinkedInBadge from './components/LinkedInBadge.vue'
import initResizeObserver from './utils/resizeObserver'

// flag of mobile sizes
const isMobile = ref(window.innerWidth < 770)

// track window width to control isMobile flag
initResizeObserver(document.body, (height: number, width: number) => {
  // set isMobile based on width
  const result = width < 770
  if (isMobile.value !== result) isMobile.value = result
})

provide('isMobile', readonly(isMobile))
</script>

<template>
  <html :class="{ content: true, mobile: isMobile }">
    <header>
      <NavMenu />
    </header>

    <RouterView class="content-view" />

    <CookieAgreement />

    <LinkedInBadge />
  </html>
</template>

<!-- Global components styles -->
<style lang="scss">
.el-table-v2__overlay {
  z-index: var(--mid-z-index);
}
</style>

<style scoped lang="scss">
.content {
  width: calc(100vw - var(--scroll-width));
  height: 100%;

  &.mobile {
    width: 100%;

    .content-view {
      width: 100%;
      position: absolute;
      top: var(--nav-bar-height);
    }
  }
}

.no-overflow-y {
  overflow-y: hidden;
  height: calc(100dvh - var(--nav-bar-height));
}
</style>
