<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import LinkedInBadge from './components/LinkedInBadge.vue'

// ref to LinkedInBadge component
const LIbadge = ref()
const isLIblocked = ref(false)
provide('isLIblocked', readonly(isLIblocked))

/**
 * Handle trigger from "DarkModeSwitch.vue" child component
 * @return {void} void
 */
function onUpdLIScript(): void {
  LIbadge.value.updLIScript()
}
</script>

<template>
  <html>
    <header>
      <NavMenu @updLIScript="onUpdLIScript" />
    </header>

    <RouterView />

    <LinkedInBadge ref="LIbadge" @changeLIblocked="isLIblocked = true" />
  </html>
</template>

<style scoped lang="scss"></style>
