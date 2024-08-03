<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import LinkedInBadge from './components/LinkedInBadge.vue'

// flag of mobile devices
const isMobile = ref(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

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
