<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'
import { MoreFilled, CloseBold } from '@element-plus/icons-vue'
import DarkModeSwitch from './navigation/DarkModeSwitch.vue'
import SocialLinks from './navigation/SocialLinks.vue'
import ContactsDropdown from './navigation/ContactsDropdown.vue'
import DsLogo from './icons/DsLogo.vue'

// dark/light theme util
const isDark = useDark() //true or false

// current route
const route = useRoute()

// flag of mobile devices
const isMobile = ref(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

// flag for mobile menu opening
const isMenuOpened = ref(false)
</script>

<template>
  <div class="menu-wrapper">
    <el-icon :size="38" class="ds-logo">
      <router-link :index="3" to="/summary"><ds-logo :isDark="isDark" /></router-link>
    </el-icon>

    <div v-if="!isMobile" class="menu">
      <!-- If not mobile version -->

      <el-menu class="nav-menu" :default-active="route.name">
        <el-menu-item index="summary"
          ><router-link id="nav-summary" :index="1" to="/summary"
            >Summary</router-link
          ></el-menu-item
        >
        <el-menu-item index="portfolio"
          ><router-link id="nav-portfolio" :index="2" to="/portfolio#ai"
            >Portfolio</router-link
          ></el-menu-item
        >
      </el-menu>

      <DarkModeSwitch class="menu-item" />

      <SocialLinks class="menu-item menu-item-no-padding" />

      <ContactsDropdown class="menu-item" />
    </div>
    <div v-else class="menu">
      <!-- If mobile version -->

      <SocialLinks class="menu-item menu-item-no-padding" />

      <div class="menu-more" @click="isMenuOpened = !isMenuOpened">
        <el-icon v-show="!isMenuOpened" :size="24">
          <more-filled />
        </el-icon>
        <el-icon v-show="isMenuOpened" :size="24">
          <close-bold />
        </el-icon>
      </div>

      <div v-if="isMenuOpened" class="menu-container fullscreen">
        <el-menu class="nav-menu" :default-active="route.name">
          <el-menu-item index="summary"
            ><router-link id="nav-summary" :index="1" to="/summary"
              >Summary</router-link
            ></el-menu-item
          >
          <el-menu-item index="portfolio"
            ><router-link id="nav-portfolio" :index="2" to="/portfolio#ai"
              >Portfolio</router-link
            ></el-menu-item
          >
        </el-menu>

        <div class="menu-container-theme-mode">
          <span>Theme</span>
          <DarkModeSwitch />
        </div>
      </div>
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

  .ds-logo {
    cursor: pointer;

    > a {
      height: 1em;
    }
  }

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
        width: 100%;
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
          width: 100%;
          text-decoration: none;
          color: inherit;
          padding: 0;
          padding: 0 0.75rem;
        }
      }
    }
  }
}

@media screen and (max-width: 440px) {
  .menu-wrapper {
    padding: 0 12px 0 24px;

    .menu {
      &-more {
        padding: 0 12px;
      }

      &-container {
        height: 100vh;
        width: 100%;
        overflow-y: auto;
        padding: 32px 68px;

        &.fullscreen {
          position: fixed;
          top: var(--nav-bar-height);
          right: 0;
          bottom: 0;
          left: 0;
          background-color: var(--el-bg-color);
        }

        &-theme-mode {
          display: flex;
          margin-top: 48px;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background-color: var(--el-color-info-light-9);
          border-radius: var(--el-border-radius-base);
        }
      }

      .nav-menu {
        flex-direction: column;
        height: fit-content;

        .el-menu-item {
          border-bottom: 2px solid var(--el-border-color);

          a {
            font-weight: bolder;
          }
        }
      }
    }
  }
}
</style>
