<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DarkModeSwitch from './navigation/DarkModeSwitch.vue'
import SocialLinks from './navigation/SocialLinks.vue'
import ContactsDropdown from './navigation/ContactsDropdown.vue'

// curr active menu item
const activeMenuItem = ref()

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
    <nav @click.prevent="setActiveMenu">
      <RouterLink :index="1" to="/">About</RouterLink>
      <RouterLink :index="2" to="/">About</RouterLink>
      <RouterLink :index="3" to="/">About</RouterLink>
    </nav>

    <DarkModeSwitch class="menu-item" @updLIScript="$emit('updLIScript')" />

    <SocialLinks class="menu-item menu-item-no-padding" />

    <ContactsDropdown class="menu-item" />
  </div>
</template>

<style lang="scss">
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

    &-no-padding {
      padding: 0;
    }
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
}
</style>
