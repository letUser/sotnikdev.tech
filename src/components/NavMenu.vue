<script setup lang="ts">
import { ref, inject, reactive } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import { useDark } from '@vueuse/core'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import {
  MoreFilled,
  CloseBold,
  Loading,
  PhoneFilled,
  Promotion,
  Message
} from '@element-plus/icons-vue'
import DarkModeSwitch from './navigation/DarkModeSwitch.vue'
import SocialLinks from './navigation/SocialLinks.vue'
import ContactsDropdown from './navigation/ContactsDropdown.vue'
import DsLogo from './icons/DsLogo.vue'
import { handleSlowNetworkAlert } from '../utils/networkAlert'

// dark/light theme util
const isDark = useDark() //true or false

// use translation
const { t } = useI18n({ useScope: 'global' })

// current router
const router = useRouter()
const route = useRoute()

const loading = reactive<{ [index: string]: boolean }>({
  '/summary': false,
  '/portfolio#ai': false
})

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>

// flag for mobile menu opening
const isMenuOpened = ref(false)

// timerId of handleSlowNetworkAlert
let timerId = 0

/**
 * Function to set all data to default state
 */
const toDefault = () => {
  if (timerId) clearTimeout(timerId) // clear timer

  for (const key of Object.keys(loading)) {
    loading[key] = false
  }
}

/**
 * Handle mobile menu item click
 * @param {string} to - link to
 */
const handleRouteChange = async (to: string) => {
  toDefault()

  loading[to] = true
  timerId = handleSlowNetworkAlert() // set timerId

  try {
    await router.push(to)
  } finally {
    changeMenuVisible()
    toDefault()
  }
}

/**
 * Change menu visibility
 */
const changeMenuVisible = () => {
  isMenuOpened.value = !isMenuOpened.value
  toDefault()

  const body = document.getElementsByClassName('content-view')[0] as HTMLElement

  if (body) {
    if (isMenuOpened.value) {
      body.classList.add('no-overflow-y')
    } else {
      body.classList.remove('no-overflow-y')
    }
  }
}
</script>

<template>
  <div class="menu-wrapper filtered-background">
    <el-icon :size="38" class="ds-logo">
      <router-link v-if="!isMobile" :index="3" to="/summary"
        ><ds-logo :isDark="isDark"
      /></router-link>
      <ds-logo v-else :isDark="isDark" />
    </el-icon>

    <div v-if="!isMobile" class="menu">
      <el-menu class="nav-menu" :default-active="route.name">
        <el-menu-item class="nav-menu-item" index="summary"
          ><el-icon
            v-if="loading['/summary']"
            class="is-loading"
            :size="24"
            color="var(--el-color-primary)"
            ><Loading
          /></el-icon>
          <a
            id="nav-summary"
            :index="1"
            href="/summary"
            @click.prevent="handleRouteChange('/summary')"
            >{{ t('nav-summary') }}</a
          ></el-menu-item
        >
        <el-menu-item class="nav-menu-item" index="portfolio"
          ><el-icon
            v-if="loading['/portfolio#ai']"
            class="is-loading"
            :size="24"
            color="var(--el-color-primary)"
            ><Loading /></el-icon
          ><a
            id="nav-portfolio"
            :index="2"
            href="/portfolio#ai"
            @click.prevent="handleRouteChange('/portfolio#ai')"
            >{{ t('nav-portfolio') }}</a
          ></el-menu-item
        >
      </el-menu>

      <DarkModeSwitch class="menu-item" />

      <SocialLinks class="menu-item menu-item-no-padding" />

      <ContactsDropdown class="menu-item" />
    </div>
    <div v-else class="menu">
      <SocialLinks class="menu-item menu-item-no-padding" />

      <div class="menu-more" @click="changeMenuVisible">
        <el-icon v-show="!isMenuOpened" :size="24">
          <more-filled />
        </el-icon>
        <el-icon v-show="isMenuOpened" :size="24">
          <close-bold />
        </el-icon>
      </div>

      <div v-if="isMenuOpened" class="menu-container fullscreen">
        <el-menu class="nav-menu" :default-active="route.name">
          <el-menu-item class="nav-menu-item" index="summary">
            <el-icon
              v-if="loading['/summary']"
              class="is-loading"
              :size="24"
              color="var(--el-color-primary)"
              ><Loading
            /></el-icon>
            <a
              id="nav-summary"
              :index="1"
              href="/summary"
              @click.prevent="handleRouteChange('/summary')"
              >{{ t('nav-summary') }}</a
            ></el-menu-item
          >
          <el-menu-item class="nav-menu-item" index="portfolio">
            <el-icon
              v-if="loading['/portfolio#ai']"
              class="is-loading"
              :size="24"
              color="var(--el-color-primary)"
              ><Loading /></el-icon
            ><a
              id="nav-portfolio"
              :index="2"
              href="/portfolio#ai"
              @click.prevent="handleRouteChange('/portfolio#ai')"
              >{{ t('nav-portfolio') }}</a
            ></el-menu-item
          >
        </el-menu>

        <div class="menu-container-theme-mode">
          <span>{{ t('nav-theme') }}</span>
          <DarkModeSwitch />
        </div>

        <div class="menu-container-contacts">
          <div title="Call me" class="menu-container-contacts-link">
            <el-icon :size="16"><phone-filled /></el-icon>
            <a href="tel:+16042451101"> +1 604-245-1101 </a>
          </div>
          <div title="DM me" class="menu-container-contacts-link">
            <el-icon :size="16"><promotion /></el-icon>
            <a target="_blank" href="https://t.me/letUser"> @letUser </a>
          </div>
          <div title="Email me" class="menu-container-contacts-link">
            <el-icon :size="16" style="padding-top: 3px"><message /></el-icon>
            <a href="mailto:work.sotnik@gmail.com"> work.sotnik@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-wrapper {
  height: var(--nav-bar-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid var(--el-border-color);

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

      &-item {
        width: 100%;
        background-color: transparent;
        height: inherit;
        padding: 0 !important;
        position: relative;

        > i {
          position: absolute;
        }

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
          padding: 0 2rem;
        }
      }
    }
  }
}

@media screen and (max-width: 770px) {
  .menu-wrapper {
    position: fixed;
    width: 100%;
    padding: 0 12px 0 24px;

    .menu {
      &-more {
        height: 24px;
        padding: 0 12px;
      }

      &-container {
        height: 100vh;
        width: 100%;
        overflow-y: hidden;
        padding: 32px 68px;

        &.fullscreen {
          position: fixed;
          top: var(--nav-bar-height);
          right: 0;
          bottom: 0;
          left: 0;
          background-color: var(--el-bg-color);
          z-index: var(--max-z-index);
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

        &-contacts {
          margin-top: 36px;

          &-link {
            padding: 8px;
            line-height: 2;
            display: flex;
            flex-direction: row;
            align-items: center;

            > a {
              text-decoration: none;
              color: inherit;
              padding-left: 16px;
            }
          }
        }
      }

      .nav-menu {
        flex-direction: column;
        height: fit-content;

        &-item {
          padding: 0 12px;
          border-bottom: 2px solid var(--el-border-color);
          overflow: hidden;

          a {
            font-weight: bolder;
          }
        }
      }
    }
  }
}
</style>
