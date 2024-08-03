<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import LinkedInBadge from './components/LinkedInBadge.vue'
import initResizeObserver from './utils/resizeObserver'

// flag of mobile sizes
const isMobile = ref(window.innerWidth < 764)

// track window width to control isMobile flag
initResizeObserver(document.body, (height: number, width: number) => {
  // set isMobile based on width
  const result = width < 764
  if (isMobile.value !== result) isMobile.value = result
})

provide('isMobile', readonly(isMobile))
</script>

<template>
  <html :class="{ content: true, mobile: isMobile }">
    <header>
      <NavMenu />
    </header>

    <RouterView />

    <LinkedInBadge />
  </html>
</template>

<style scoped lang="scss">
.content {
  width: calc(100vw - var(--scroll-width));

  &.mobile {
    width: 100%;
  }
}
</style>
