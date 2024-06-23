<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import type { DropdownInstance } from 'element-plus'
import MoonIcon from './components/icons/MoonIcon.vue'
import SunIcon from './components/icons/SunIcon.vue'
import GitHub from './components/icons/GitHub.vue'
import LinkedIn from './components/icons/LinkedIn.vue'
import { ArrowDown, ArrowUp, PhoneFilled, Promotion, Message } from '@element-plus/icons-vue'

// dark/light theme util
const isDark = useDark() //true or false
const toggleDark = useToggle(isDark)

// state for theme switcher
const darkMode = ref(isDark.value)

// curr active menu item
const activeMenuItem = ref()

// curr state for contacts dropdown
const contactsExpanded = ref(false)
const dropdown = ref<DropdownInstance>()

const LIbadgeKey = ref(0)
const LIbadgeLoading = ref(false)
const isLIblocked = ref(false)

onMounted(() => {
  setTimeout(() => updateLinkedInScript(), 1000)
})

/**
 * Menu item click handler
 * @param {Event} $event - state of event
 * @return {void} void
 */
function setActiveMenu($event: Event): void {
  if (!$event?.target) throw new Error('App.vue -> setActiveMenu -> $el.target is NULL')

  // remove active class from prev clicked elem
  activeMenuItem.value?.classList.remove('active')

  const { target } = $event

  if (target instanceof HTMLElement) {
    // add active class to curr clicked elem
    target.classList.add('active')

    // save link to the curr clicked elem
    activeMenuItem.value = target
  }
}

/**
 * Dark mode switcher handler
 * @return {void} void
 */
function handleToggleDark(): void {
  toggleDark()
  if (!isLIblocked.value) updateLinkedInScript()
}

/**
 * Contacts dropdown hover handler
 * @param {boolean} state - flag "is hover"
 * @return {void} void
 */
function handleContactsHover(state: boolean): void {
  contactsExpanded.value = state

  if (state) dropdown.value?.handleOpen()
  else dropdown.value?.handleClose()
}

/**
 * External HTML with LinkedIn badge loader |
 * Forced reload is triggered by dark mode switcher
 * @return {void} void
 */
function updateLinkedInScript(): void {
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
    ElMessage({
      message: 'Looks like we can not establish connection with LinkedIn.',
      type: 'warning',
      plain: true,
      duration: 6000
    })
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
        iframe.style.borderRadius = '3px'
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
            badge.style.zIndex = '-1'

            // end loading process
            LIbadgeLoading.value = false
          }
        }, 100)
      }
    }
  }

  LIbadgeKey.value++
}
</script>

<template>
  <html>
    <header>
      <div class="menu-wrapper">
        <nav @click.prevent="setActiveMenu">
          <RouterLink :index="1" to="/">About</RouterLink>
          <RouterLink :index="2" to="/">About</RouterLink>
          <RouterLink :index="3" to="/">About</RouterLink>
        </nav>

        <div class="theme-switch menu-item">
          <el-switch
            v-model="darkMode"
            @change="handleToggleDark"
            style="
              --el-switch-on-color: var(--color-background-mute);
              --el-switch-off-color: var(--vt-c-white-mute);
              --el-switch-border-color: var(--color-border);
            "
          >
            <template #active-action>
              <span class="custom-action active"><MoonIcon /></span>
            </template>
            <template #inactive-action>
              <span class="custom-action inactive"><SunIcon /></span>
            </template>
          </el-switch>
        </div>

        <div class="menu-item social">
          <a
            class="social-link"
            target="_blank"
            href="https://github.com/letUser"
            title="Go to GitHub"
            ><el-icon :size="24"><git-hub /></el-icon
          ></a>
        </div>

        <div v-if="isLIblocked" class="menu-item social">
          <a
            class="social-link"
            target="_blank"
            href="https://www.linkedin.com/in/sotnik/"
            title="Go to LinkedIn"
            ><el-icon :size="22"><linked-in /></el-icon
          ></a>
        </div>

        <div
          class="contacts menu-item"
          @mouseenter="handleContactsHover(true)"
          @mouseleave="handleContactsHover(false)"
        >
          <span> Contacts </span>

          <el-dropdown
            ref="dropdown"
            trigger="contextmenu"
            :teleported="false"
            popper-class="contacts-list"
          >
            <span class="contacts-arrow"
              ><el-icon v-if="!contactsExpanded">
                <arrow-down />
              </el-icon>
              <el-icon v-else> <arrow-up /> </el-icon
            ></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item title="Call me"
                  ><el-icon><phone-filled /></el-icon>
                  <a href="tel:+16042451101" class="dropdown-link">
                    +1 604-245-1101
                  </a></el-dropdown-item
                >
                <el-dropdown-item title="DM me"
                  ><el-icon><promotion /></el-icon>
                  <a target="_blank" href="https://t.me/letUser" class="dropdown-link">
                    @letUser
                  </a></el-dropdown-item
                >
                <el-dropdown-item title="Email me"
                  ><el-icon><message /></el-icon>
                  <a href="mailto:work.sotnik@gmail.com" class="dropdown-link">
                    work.sotnik@gmail.com</a
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <div v-show="!LIbadgeLoading" class="linkedin-popper">
      <div
        :key="LIbadgeKey"
        id="LIbadge"
        class="li-badge badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="large"
        :data-theme="darkMode ? 'dark' : 'light'"
        data-type="HORIZONTAL"
        data-vanity="sotnik"
        data-version="v1"
      />
    </div>

    <RouterView />
  </html>
</template>

<style scoped lang="scss">
.menu-wrapper {
  display: flex;
  justify-content: right;
  align-items: stretch;
  padding: 0 2rem;
  border-bottom: 2px solid var(--color-border);

  .menu-item {
    display: inherit;
    align-items: center;
    padding: 0 0.75rem;
  }

  nav {
    display: flex;
    height: 3rem;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      padding: 0 0.75rem;

      &:hover {
        color: var(--el-color-primary-dark-1);
      }

      &.active {
        color: var(--el-color-primary-dark-1);
        border-bottom: 2px solid var(--el-color-primary-dark-1);
      }
    }
  }

  .theme-switch {
    .el-switch {
      cursor: pointer;
      animation: fade 0.5s;
    }

    .custom-action {
      width: 100%;
      height: 100%;
      border-radius: 100%;

      &.active {
        background-color: var(--el-color-base-background);
      }

      &.inactive {
        border: 1px solid var(--color-border);
      }
    }

    &:hover {
      .el-switch {
        .custom-action {
          animation: pulse 2s infinite;
        }
      }
    }
  }

  .social {
    &-link {
      text-decoration: none;
      color: inherit;
      height: 1.5rem;

      &:hover {
        color: var(--el-color-primary-dark-1);
      }
    }
  }

  .contacts {
    outline: none;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary-dark-1);

      .contacts-arrow {
        color: var(--el-color-primary-dark-1);
      }
    }

    > span {
      margin-right: 5px;
    }

    &-arrow {
      outline: none;

      > i {
        animation: fade 0.5s;
      }
    }

    .contacts-list {
      .dropdown-link {
        text-decoration: none;
        color: inherit;
        font-family: Helvetica;
      }
    }
  }
}

.linkedin-popper {
  margin: 0 4px 10px 0;
  width: fit-content;
  height: fit-content;
  position: absolute;
  overflow: hidden;
  bottom: 0;
  right: 0;

  .li-badge {
    animation: slide 1.5s;
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--color-border);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 3px var(--el-color-primary-dark-1);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--color-border);
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
</style>
