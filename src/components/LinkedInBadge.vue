<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useDark } from '@vueuse/core'
import { Close } from '@element-plus/icons-vue'
import SourceLinkedInBadge from './legacy/SourceLinkedInBadge.vue'

const emit = defineEmits(['destroyLIbadge'])

// fetch LinkedIn badge in 6sec after app creation
onMounted(() => {
  // if LinkedIn wasn't closed by user, then...
  if (!isLIclosed.value) {
    // if LinkedIn wasn't blocked by region, then fetch the script
    if (!isLIblocked.value) setTimeout(() => updLIScript(), 6000)
    // if LinkedIn is blocked by region, then start animation for twin-component
    else {
      LIbadgeLoading.value = true
      setTimeout(() => {
        createAnimationsQuery(document.getElementById('legacyLIbadge'))
        LIbadgeLoading.value = false
      }, 6000)
    }
  }
})

const isDark = useDark() //true or false
const LIbadgeKey = ref(0)
const LIbadgeLoading = ref(false)
const isLIblocked = ref(Boolean(sessionStorage.getItem('sotnikdev.tech:isLIblocked')))
const isLIclosed = ref(Boolean(sessionStorage.getItem('sotnikdev.tech:isLIclosed')))
const firstLoad = ref(true)
const closeIcon = ref<(Node & { $el: HTMLElement }) | null>()

/**
 * External HTML with LinkedIn badge loader |
 * Forced reload is triggered by dark mode switcher
 * @return {void} void
 */
function updLIScript(): void {
  // return if LinkedIn is blocked or closed
  if (isLIblocked.value || isLIclosed.value) return

  // start loading process
  LIbadgeLoading.value = true

  // delete prev script and external badge with different color scheme
  removeBadge()

  // create new script with curr color scheme
  const script = createScript()

  // if script is unavailable
  script.onerror = () => blockBadgeRequest()

  // if script is loaded
  script.onload = () => {
    const badgeScript = document.body.lastChild as HTMLScriptElement

    // check script for right address
    if (badgeScript?.src?.includes('badges.linkedin.com')) {
      // if second script is loaded
      badgeScript.onload = async () => {
        // dig into external HTML and change styles step by step
        const badgeWrapper = document.getElementById('LIbadge')
        let iframe = badgeWrapper?.firstChild as HTMLIFrameElement
        iframe.style.borderRadius = '7px'
        const body = iframe?.contentWindow?.document.body
        if (body) body.style.overflow = 'hidden'
        const profile = body?.getElementsByClassName('profile-badge')

        // awaiting DIV creation in external HTML
        const intervalId = setInterval(() => {
          if (profile?.length) {
            clearInterval(intervalId)

            // dig into LinkedIn badge and change styles
            const badge = profile[0] as HTMLElement
            badge.style.marginLeft = '0'
            badge.style.borderRadius = '0'
            badge.style.width = '100%'
            badge.style.height = '100%'

            // add close button to the badge
            createCloseIcon(badge)

            // end loading process
            LIbadgeLoading.value = false

            // create animations query
            createAnimationsQuery(badgeWrapper)
          }
        }, 100)
      }
    }
  }

  // update LinkedIn badge component
  LIbadgeKey.value++
}

/**
 * Handle removing of LinkedIn script
 * @return {void} void
 */
function removeBadge(): void {
  // to save the component with icon close transfer it out from badge component
  transferIconCloseFromBadge()

  const prevScript = document.getElementById('linked-in-script')
  prevScript?.remove()
  LIbadgeLoading.value = true
}

/**
 * Create new LinkedIn script with current theme color
 * @return {HTMLScriptElement} created script for LinkedIn
 */
function createScript(): HTMLScriptElement {
  const script = document.createElement('script')
  script.src = 'https://platform.linkedin.com/badges/js/profile.js'
  script.async = true
  script.defer = true
  script.type = 'text/javascript'
  script.id = 'linked-in-script'

  document.head.appendChild(script)

  return script
}

/**
 * Handle blocking of LinkedIn script fetching
 * @return {void} void
 */
function blockBadgeRequest(): void {
  isLIblocked.value = true
  sessionStorage.setItem('sotnikdev.tech:isLIblocked', 'true')

  //end loading process
  LIbadgeLoading.value = false

  // wait DOM update and start animation query
  nextTick(() => createAnimationsQuery(document.getElementById('legacyLIbadge')))
}

/**
 * Handle closing of LinkedIn badge by user
 * @return {void} void
 */
function closeBadge(): void {
  isLIclosed.value = true
  emit('destroyLIbadge')
  sessionStorage.setItem('sotnikdev.tech:isLIclosed', 'true')
}

/**
 * Creating close icon for badge
 * @return {void} void
 */
function createCloseIcon(badge: HTMLElement): void {
  const badgeHeader = badge.getElementsByClassName('profile-badge__header')[0] as HTMLElement

  if (badgeHeader && closeIcon.value) {
    badgeHeader.style.display = 'flex'
    badgeHeader.style.flexDirection = 'row'
    badgeHeader.style.justifyContent = 'space-between'
    badgeHeader.style.alignItems = 'center'

    const iconNode = closeIcon.value.$el as HTMLElement
    iconNode.style.width = '16px'
    iconNode.style.height = '16px'
    iconNode.style.display = 'block'
    iconNode.style.cursor = 'pointer'

    if (!iconNode.onclick) {
      iconNode.onclick = onClose
    }

    badgeHeader.append(iconNode)
  }
}

/**
 * Remove icon from badge component and prepend it into initial place on badge destruction
 * @return {void} void
 */
function transferIconCloseFromBadge(): void {
  const iconNode = closeIcon.value?.$el as HTMLElement
  iconNode.style.display = 'none'
  const badgePopper = document.getElementById('LIbadge')?.parentNode
  badgePopper?.prepend(iconNode)
}

/**
 * Start timeouts for badge animations
 * @return {void} void
 */
function createAnimationsQuery(badgeWrapper: HTMLElement | null): void {
  if (badgeWrapper) {
    if (firstLoad.value) {
      setTimeout(() => {
        badgeWrapper.classList.remove('li-badge--slide')
        badgeWrapper.classList.add('li-badge--pulse')
      }, 2000)

      setTimeout(() => {
        badgeWrapper.classList.remove('li-badge--pulse')
        badgeWrapper.classList.add('li-badge--opacity-35')

        firstLoad.value = false
      }, 8000)
    } else {
      setTimeout(() => {
        badgeWrapper.classList.add('li-badge--opacity-35')
      }, 2000)
    }
  }
}

/**
 * Handle click on close icon
 * @return {void} void
 */
function onClose(): void {
  closeBadge()
  removeBadge()
}

// share variables and functions with ancestor
defineExpose({ updLIScript })
</script>

<template>
  <div v-if="!isLIclosed" v-show="!LIbadgeLoading" class="linkedin-popper">
    <el-icon style="display: none" ref="closeIcon" :size="16">
      <close />
    </el-icon>
    <SourceLinkedInBadge
      v-if="isLIblocked"
      class="li-badge li-badge--slide li-badge--legacy"
      id="legacyLIbadge"
      @onClose="onClose"
    />
    <div
      v-else
      :key="LIbadgeKey"
      id="LIbadge"
      class="li-badge li-badge--slide badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="large"
      :data-theme="isDark ? 'dark' : 'light'"
      data-type="HORIZONTAL"
      data-vanity="sotnik"
      data-version="v1"
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

    &--opacity-35 {
      opacity: 0.35;
      transition: opacity 2s;
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
