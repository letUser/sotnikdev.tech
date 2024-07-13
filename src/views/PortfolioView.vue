<script setup lang="ts">
import LeftMenu from '../components/LeftMenu.vue'
import FinTechPlayground from '../components/FinTechPlayground.vue'
import GisPlayground from '../components/GisPlayground.vue'
</script>

<template>
  <div class="section-portfolio-wrapper">
    <div class="section-portfolio">
      <LeftMenu />

      <FinTechPlayground class="playground" />

      <!-- <GisPlayground class="playground" /> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-portfolio {
  text-align: center;
  display: flex;

  .playground {
    width: 100%;
    padding: var(--page-vertical-padding) var(--page-horizontal-padding);
    height: calc(100vh - var(--nav-bar-height) + 1px); //1px - border size
  }
}
</style>
