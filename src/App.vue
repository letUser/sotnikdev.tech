<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import type { DropdownInstance } from 'element-plus'
import MoonIcon from './components/icons/MoonIcon.vue'
import SunIcon from './components/icons/SunIcon.vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

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

/**
 * Menu item click handler
 * @param {Event} $event - state of event
 * @return {undefined} undefined
 */
function setActiveMenu($event: Event): undefined {
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
 * Contacts dropdown hover handler
 * @param {boolean} state - flag "is hover"
 * @return {undefined} undefined
 */
function handleContactsHover(state: boolean): undefined {
  contactsExpanded.value = state

  if (state) dropdown.value?.handleOpen()
  else dropdown.value?.handleClose()
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
            @change="toggleDark"
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

        <div
          class="contacts menu-item"
          @mouseenter="handleContactsHover(true)"
          @mouseleave="handleContactsHover(false)"
        >
          <span> Contacts </span>

          <el-dropdown ref="dropdown" trigger="contextmenu" :teleported="false">
            <span class="contacts-arrow"
              ><el-icon v-show="!contactsExpanded">
                <arrow-down />
              </el-icon>
              <el-icon v-show="contactsExpanded"> <arrow-up /> </el-icon
            ></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
    }
  }
}
</style>
