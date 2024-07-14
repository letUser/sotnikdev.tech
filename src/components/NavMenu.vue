<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'
import DarkModeSwitch from './navigation/DarkModeSwitch.vue'
import SocialLinks from './navigation/SocialLinks.vue'
import ContactsDropdown from './navigation/ContactsDropdown.vue'
import DsLogo from './icons/DsLogo.vue'

// dark/light theme util
const isDark = useDark() //true or false

// current route
const route = useRoute()
</script>

<template>
  <div class="menu-wrapper">
    <el-icon :size="38">
      <ds-logo :isDark="isDark" />
    </el-icon>

    <div class="menu">
      <el-menu class="nav-menu" :default-active="route.name">
        <el-menu-item index="summary"
          ><router-link id="nav-summary" :index="1" to="/summary"
            >Summary</router-link
          ></el-menu-item
        >
        <el-menu-item index="portfolio"
          ><router-link id="nav-portfolio" :index="2" to="/portfolio#performance"
            >Portfolio</router-link
          ></el-menu-item
        >
      </el-menu>

      <DarkModeSwitch class="menu-item" />

      <SocialLinks class="menu-item menu-item-no-padding" />

      <ContactsDropdown class="menu-item" />
    </div>
  </div>
</template>

<style lang="scss">
.menu-wrapper {
  height: var(--nav-bar-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid var(--el-border-color);
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

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

    .nav-menu {
      display: flex;
      align-items: center;
      height: var(--nav-bar-height);
      border-right: none;

      .el-menu-item {
        background-color: transparent;
        height: inherit;
        padding: 0;

        &.is-active {
          color: var(--el-color-primary);
          border-bottom: 2px solid var(--el-color-primary);
        }

        &:hover {
          color: var(--el-color-primary);
        }

        a {
          text-decoration: none;
          color: inherit;
          padding: 0;
          padding: 0 0.75rem;
        }
      }
    }
  }
}
</style>
