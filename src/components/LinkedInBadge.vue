<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SourceLinkedInBadge from './legacy/SourceLinkedInBadge.vue'

// show LinkedIn badge in 6sec after app creation
onMounted(() => {
  // if LinkedIn wasn't closed by user, then...
  if (!isLIclosed.value) {
    LIbadgeLoading.value = true
    setTimeout(() => {
      createAnimationsQuery(document.getElementById('legacyLIbadge'))
      LIbadgeLoading.value = false
    }, 6000)
  }
})

const LIbadgeLoading = ref(false)
const isLIclosed = ref(Boolean(sessionStorage.getItem('sotnikdev.tech:isLIclosed')))

/**
 * Handle closing of LinkedIn badge by user
 * @return {void} void
 */
function closeBadge(): void {
  isLIclosed.value = true
  sessionStorage.setItem('sotnikdev.tech:isLIclosed', 'true')
}

/**
 * Start timeouts for badge animations
 * @return {void} void
 */
function createAnimationsQuery(badgeWrapper: HTMLElement | null): void {
  if (badgeWrapper) {
    setTimeout(() => {
      badgeWrapper.classList.remove('li-badge--slide')
      badgeWrapper.classList.add('li-badge--pulse')
    }, 2000)

    setTimeout(() => {
      badgeWrapper.classList.remove('li-badge--pulse')
      badgeWrapper.classList.add('li-badge--opacity-20')
    }, 8000)
  }
}
</script>

<template>
  <div v-if="!isLIclosed" v-show="!LIbadgeLoading" class="linkedin-popper">
    <SourceLinkedInBadge
      class="li-badge li-badge--slide li-badge--legacy"
      id="legacyLIbadge"
      @onClose="closeBadge"
    />
  </div>
</template>

<style scoped lang="scss">
.linkedin-popper {
  margin: 0 4px 10px 0;
  width: fit-content;
  height: fit-content;
  position: absolute;
  overflow: hidden;
  bottom: 0;
  right: 0;

  .li-badge {
    border: 1px solid var(--el-border-color);
    border-radius: 8px;

    &--legacy {
      width: 335px;
      height: 305px;
    }

    &:hover {
      opacity: 1;
    }

    &--slide {
      animation: slide 1.5s;
    }

    &--pulse {
      animation: pulse 2s infinite;
    }

    &--opacity-20 {
      opacity: 0.2;
      transition:
        opacity 1s,
        backdrop-filter 1s;
    }
  }
}

@keyframes slide {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  70% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}
</style>
