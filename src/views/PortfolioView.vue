<script setup lang="ts">
import FinTechPlayground from '../components/FinTechPlayground.vue'
</script>

<template>
  <div class="section-portfolio">
    <FinTechPlayground />
  </div>
</template>

<style scoped lang="scss">
.section-portfolio {
  display: flex;
  flex-direction: column;
  padding: 80px 40px;
  text-align: center;
  height: calc(100vh - (var(--nav-bar-height) + 1px)); //1px - border size
}
</style>
