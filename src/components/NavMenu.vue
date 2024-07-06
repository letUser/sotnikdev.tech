<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'
import DarkModeSwitch from './navigation/DarkModeSwitch.vue'
import SocialLinks from './navigation/SocialLinks.vue'
import ContactsDropdown from './navigation/ContactsDropdown.vue'
import DsLogo from './icons/DsLogo.vue'

// curr active menu item
const activeMenuItem = ref()

// dark/light theme util
const isDark = useDark() //true or false

// current route
const route = useRoute()

// route watcher to monitor route changes and set the correct menu item
watch(route, (route) => {
  if (route?.name) {
    const target = document.getElementById(`nav-${String(route.name)}`)

    if (target instanceof HTMLElement) {
      // using timeout to catch needed element
      setTimeout(() => {
        target.classList.add('active')
        activeMenuItem.value = target
      }, 50)
    }
  }
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
</script>

<template>
  <div class="menu-wrapper">
    <el-icon :size="38">
      <ds-logo :isDark="isDark" />
    </el-icon>

    <div class="menu">
      <nav @click.prevent="setActiveMenu">
        <router-link id="nav-summary" :index="1" to="/summary">Summary</router-link>
        <router-link id="nav-portfolio" :index="2" to="/portfolio">Portfolio</router-link>
      </nav>

      <DarkModeSwitch class="menu-item" />

      <SocialLinks class="menu-item menu-item-no-padding" />

      <ContactsDropdown class="menu-item" />
    </div>
  </div>
</template>

<style lang="scss">
.menu-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid var(--el-border-color);
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);

  .menu {
    display: flex;
    justify-items: right;
    align-items: stretch;

    .menu-item {
      display: inherit;
      align-items: center;
      padding: 0 0.75rem;

      &-no-padding {
        padding: 0;
      }
    }

    nav {
      display: flex;
      height: var(--nav-bar-height);

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        padding: 0 0.75rem;

        &:hover {
          color: var(--el-color-primary);
        }

        &.active {
          color: var(--el-color-primary);
          border-bottom: 2px solid var(--el-color-primary);
        }
      }
    }
  }
}
</style>
