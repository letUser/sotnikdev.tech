<script setup lang="ts">
import BrandImageWrapper from '../components/BrandImageWrapper.vue'

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
    <div @mousemove="onMouseMove">
      <BrandImageWrapper id="brand-image-wrapper" />
      <div style="height: 1000px" />
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
