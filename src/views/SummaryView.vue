<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import BrandImageWrapper from '../components/BrandImageWrapper.vue'
import SkillSection from '../components/SkillSection.vue'
import SummaryInfo from '../components/SummaryInfo.vue'

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>

/**
 * Handle Mouse Move event for Route scope
 * @param {MouseEvent} $ev event
 */
const onMouseMove = ($ev: MouseEvent) => {
  const container = document.getElementById('brand-image-wrapper') as HTMLElement

  if ($ev.view) {
    const window = $ev.view as Window

    const centerX = Math.floor(window.innerWidth / 2)
    const centerY = Math.floor(window.innerHeight / 2)

    if (container) {
      const child = container.firstChild as HTMLElement

      if (child) {
        const Xpos = ($ev.clientX - centerX) / 64
        const Ypos = ($ev.clientY - centerY) / 64

        child.style.transform = `rotateX(${Ypos * -1}deg) rotateY(${Xpos}deg)`

        const modal = child.firstChild as HTMLElement
        const mobile = child.lastChild as HTMLElement

        if (modal) modal.style.transform = `translateX(${Xpos}px) translateY(${Ypos * -1}px)`
        if (mobile) mobile.style.transform = `translateX(${Xpos}px) translateY(${Ypos * -1}px)`
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="section-summary">
      <div @mousemove="!isMobile ? onMouseMove($event) : null">
        <div class="section-summary-item section-summary-name">
          <h1>Dan Sotnik</h1>
          <p>A LinkedIn Top Voice Software Developer with over 5 years of experience</p>
        </div>

        <BrandImageWrapper id="brand-image-wrapper" class="section-summary-item" />

        <SkillSection class="section-summary-item" />
      </div>

      <SummaryInfo class="section-summary-item" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.section-summary {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding: var(--summary-vertical-padding) var(--page-horizontal-padding) 0;
  text-align: center;

  &-item {
    margin-bottom: 5rem;
  }

  &-name {
    > p {
      margin-top: 16px;
      font-size: 24px;
      color: var(--el-text-color-regular);
    }
  }
}

@media screen and (max-width: 640px) {
  .section-summary {
    padding: 30px 10px;

    &-item {
      margin-bottom: 24px;
    }

    &-name {
      > p {
        font-size: 16px;
      }
    }
  }
}
</style>
