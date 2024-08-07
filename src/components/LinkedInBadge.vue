<script setup lang="ts">
import { ref, inject, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import SourceLinkedInBadge from './legacy/SourceLinkedInBadge.vue'
import { ArrowLeft } from '@element-plus/icons-vue'

// show LinkedIn badge in 6sec after app creation
onMounted(() => {
  // if LinkedIn wasn't closed by user, then...
  if (!isLIclosed.value) {
    // if not mobile mode, then...
    if (!isMobile.value) {
      setTimeout(() => {
        if (route.name === 'summary') {
          isBadgeHidden.value = false
          createAnimationsQuery()
        } else {
          prepareComponent()
        }
      }, 1000)
    }
  }
})

// current route
const route = useRoute()

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>

// if mobile mode on app creation, then create watcher to track once
// mobile mode will be changed to desktop
if (isMobile.value) {
  watch(
    isMobile,
    (val: boolean) => {
      // if desktop mode
      if (!val) {
        if (route.name === 'summary') {
          isBadgeHidden.value = false
          createAnimationsQuery()
        } else {
          prepareComponent()
        }
      }
    },
    { once: true }
  )
}

const isLIclosed = ref(false)
const isBadgeHidden = ref(true)
const noDisplay = ref(true)

/**
 * Handle closing of LinkedIn badge by user
 */
const closeBadge = () => {
  isLIclosed.value = true
  sessionStorage.setItem('sotnikdev.tech:isLIclosed', 'true')
}

/**
 * Prepare component for postanimation state
 */
const prepareComponent = () => {
  const badgeWrapper = document.getElementById('legacyLIbadge') as HTMLElement

  if (!badgeWrapper) return

  // set mouse leave event to handle badge hidding process
  const parent = badgeWrapper.parentElement as HTMLElement

  if (parent) {
    parent.onmouseleave = () => (isBadgeHidden.value = true)

    // remove 'display: none' from bookmark
    noDisplay.value = false
  }
}

/**
 * Start timeouts for badge animations
 */
const createAnimationsQuery = () => {
  const badgeWrapper = document.getElementById('legacyLIbadge') as HTMLElement

  if (badgeWrapper) {
    // in 1 sec
    setTimeout(() => {
      //start pulse animation
      badgeWrapper.classList.add('li-badge--pulse')

      // in 4 sec
      setTimeout(() => {
        //end pulse animation
        badgeWrapper.classList.remove('li-badge--pulse')

        prepareComponent()

        // in 2 sec
        setTimeout(() => {
          //hide badge
          isBadgeHidden.value = true
        }, 2000)
      }, 4000)
    }, 1000)
  }
}
</script>

<template>
  <div
    v-if="!isLIclosed"
    :class="{
      'linkedin-popper': true,
      'linkedin-popper--visible': !isBadgeHidden,
      'linkedin-popper--hidden': isBadgeHidden
    }"
  >
    <div
      :class="{
        'linkedin-popper-bookmark': true,
        'linkedin-popper-bookmark--hidden': !isBadgeHidden,
        'linkedin-popper-bookmark--display-none': noDisplay
      }"
    >
      <div class="linkedin-popper-bookmark-icons" @mouseenter="isBadgeHidden = false">
        <el-icon :size="20"><arrow-left /></el-icon>
      </div>
    </div>
    <SourceLinkedInBadge
      class="li-badge li-badge--legacy"
      id="legacyLIbadge"
      @onClose="closeBadge"
    />
  </div>
</template>

<style scoped lang="scss">
.linkedin-popper {
  margin: 0 0 var(--page-padding-small) 0;
  display: flex;
  width: fit-content;
  height: fit-content;
  position: fixed;
  overflow: hidden;
  bottom: 0;
  right: 0;
  z-index: var(--max-z-index);

  &--visible {
    transform: translateX(0);
    transition: transform 1s ease-in;
  }

  &--hidden {
    transform: translateX(92%);
    transition: transform 1s ease-in;
  }

  .li-badge {
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    position: sticky;

    &--legacy {
      width: 335px;
      height: 305px;
    }

    &:hover {
      opacity: 1;
    }

    &--pulse {
      animation: pulse 2s infinite;
    }
  }

  &-bookmark {
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: baseline;
    opacity: 1;
    transition: opacity 3s ease-in-out;

    &--hidden {
      opacity: 0;
      transition: opacity 0.35s ease-in-out;
    }

    &--display-none {
      visibility: hidden;
    }

    &-icons {
      cursor: pointer;
      border: 1px solid var(--el-border-color-darker);
      border-radius: 25px 0 0 25px;
      background-color: var(--el-bg-color-overlay);
      padding: 4px;
    }
  }
}

@media screen and (max-width: 770px) {
  .linkedin-popper {
    display: none;
  }
}

@media screen and (max-height: 500px) {
  .linkedin-popper {
    &-bookmark {
      top: 10vh;
    }
  }
}

@media screen and (max-height: 350px) {
  .linkedin-popper {
    visibility: hidden;
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
