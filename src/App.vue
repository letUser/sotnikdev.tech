<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import LinkedInBadge from './components/LinkedInBadge.vue'
</script>

<template>
  <html>
    <header>
      <NavMenu />
    </header>

    <RouterView />

    <LinkedInBadge />
  </html>
</template>

<style scoped lang="scss"></style>
