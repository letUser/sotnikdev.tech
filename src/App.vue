<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import moonIcon from './assets/moon.svg'

// dark/light theme util
const isDark = useDark() //true or false
const toggleDark = useToggle(isDark)

// state for theme switcher
const darkMode = ref(isDark.value)

// curr active menu item
const activeMenuItem = ref()

/**
 * Menu item click handler
 * @param $event - state of event
 * @return void
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
  <html>
    <header>
      <div class="menu-wrapper">
        <nav @click.prevent="setActiveMenu">
          <RouterLink :index="1" to="/">About</RouterLink>
          <RouterLink :index="2" to="/">About</RouterLink>
          <RouterLink :index="3" to="/">About</RouterLink>
        </nav>

        <div class="menu-item">
          <el-switch
            v-model="darkMode"
            @change="toggleDark"
            style="
              --el-switch-on-color: var(--color-background-mute);
              --el-switch-off-color: var(--vt-c-white-mute);
              --el-switch-border-color: var(--color-border);
            "
            :active-action-icon="moonIcon"
            :inactive-action-icon="Sunny"
          />
        </div>

        <div class="menu-item">Contacts</div>
      </div>

      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    </header>

    <RouterView />
  </html>
</template>

<style scoped lang="scss">
.menu-wrapper {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 2px solid var(--color-border);

  .menu-item {
    padding: 0 0.75rem;
  }

  nav {
    display: flex;
    height: 3rem;

    a {
      height: 100%;
      line-height: 100%;
      text-decoration: none;
      color: inherit;
      vertical-align: middle;
      padding: 0 0.75rem;

      &.active {
        color: var(--el-color-primary-dark-1);
        border-bottom: 2px solid var(--el-color-primary-dark-1);
      }
    }
  }
}
</style>
