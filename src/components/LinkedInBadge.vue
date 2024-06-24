<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDark } from '@vueuse/core'
import { Close } from '@element-plus/icons-vue'

const emit = defineEmits(['changeLIblocked'])

// fetch LinkedIn badge in 5sec after app creation
onMounted(() => {
  setTimeout(() => updLIScript(), 1000)
})

const isDark = useDark() //true or false
const LIbadgeKey = ref(0)
const LIbadgeLoading = ref(false)
const isLIblocked = ref(false)
const firstLoad = ref(true)
const closeIcon = ref<(Node & { $el: HTMLElement }) | null>()

/**
 * External HTML with LinkedIn badge loader |
 * Forced reload is triggered by dark mode switcher
 * @return {void} void
 */
function updLIScript(): void {
  // start loading process
  LIbadgeLoading.value = true

  // delete prev script and external badge with different color scheme
  const prevScript = document.getElementById('linked-in-script')
  prevScript?.remove()

  // create new script with curr color scheme
  const script = document.createElement('script')
  script.src = 'https://platform.linkedin.com/badges/js/profile.js'
  script.async = true
  script.defer = true
  script.type = 'text/javascript'
  script.id = 'linked-in-script'

  document.head.appendChild(script)

  // if script is unavailable
  script.onerror = () => {
    isLIblocked.value = true
    emit('changeLIblocked')
  }

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
            const badge = profile[0] as HTMLElement
            badge.style.marginLeft = '0'
            badge.style.borderRadius = '0'
            badge.style.width = '100%'
            badge.style.height = '100%'

            // add close button to the badge
            const badgeHeader = badge.getElementsByClassName(
              'profile-badge__header'
            )[0] as HTMLElement
            if (badgeHeader && closeIcon.value) {
              badgeHeader.style.display = 'flex'
              badgeHeader.style.flexDirection = 'row'
              badgeHeader.style.justifyContent = 'space-between'
              badgeHeader.style.alignItems = 'center'

              const iconNode = closeIcon.value.$el.parentNode?.childNodes[0] as HTMLElement
              iconNode.style.width = '16px'
              iconNode.style.height = '16px'
              iconNode.style.display = 'block'
              iconNode.style.cursor = 'pointer'

              iconNode.onclick = () => {
                isLIblocked.value = true
                emit('changeLIblocked')

                script.remove()
                LIbadgeLoading.value = true
              }

              badgeHeader.append(iconNode)
            }

            // end loading process
            LIbadgeLoading.value = false

            if (badgeWrapper) {
              if (firstLoad.value) {
                setTimeout(() => {
                  badgeWrapper.classList.remove('li-badge--slide')
                  badgeWrapper.classList.add('li-badge--pulse')
                }, 2000)

                setTimeout(() => {
                  badgeWrapper.classList.remove('li-badge--pulse')
                  badgeWrapper.classList.add('li-badge--opacity-75')
                  firstLoad.value = false
                }, 8000)
              } else {
                setTimeout(() => {
                  badgeWrapper.classList.add('li-badge--opacity-75')
                }, 2000)
              }
            }
          }
        }, 100)
      }
    }
  }

  LIbadgeKey.value++
}

// share variables and functions with ancestor
defineExpose({ updLIScript })
</script>

<template>
  <div v-show="!LIbadgeLoading" class="linkedin-popper">
    <el-icon style="display: none" ref="closeIcon" :size="16">
      <close />
    </el-icon>
    <div
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
    border: 1px solid var(--color-border);
    border-radius: 8px;

    &:hover {
      opacity: 1;
    }

    &--slide {
      animation: slide 1.5s;
    }

    &--pulse {
      animation: pulse 2s infinite;
    }

    &--opacity-75 {
      opacity: 0.75;
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
