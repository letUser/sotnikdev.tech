<script setup lang="ts">
import BrandImageWrapper from '../components/BrandImageWrapper.vue'
import SkillSection from '../components/SkillSection.vue'
import SummaryInfo from '../components/SummaryInfo.vue'

/**
 * Handle Mouse Move event for Route scope
 * @param {MouseEvent} $ev event
 * @return {void} void
 */
function onMouseMove($ev: MouseEvent): void {
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

        modal.style.transform = `translateX(${Xpos}px) translateY(${Ypos * -1}px)`
        mobile.style.transform = `translateX(${Xpos}px) translateY(${Ypos * -1}px)`
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="section-summary" @mousemove="onMouseMove">
      <div class="section-summary-name">
        <h1>Dan Sotnik</h1>
        <p>A LinkedIn Top Voice Software Developer with over 5 years of experience</p>
      </div>

      <BrandImageWrapper id="brand-image-wrapper" />

      <SkillSection />

      <SummaryInfo />
    </div>
  </main>
</template>

<style scoped lang="scss">
.section-summary {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding: 80px 40px 0;
  text-align: center;

  > div {
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
</style>
