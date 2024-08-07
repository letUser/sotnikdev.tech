<script setup lang="ts">
import { ref, watch, onDeactivated } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import { useDark, useDebounceFn } from '@vueuse/core'

// use translation
const { t } = useI18n({ useScope: 'global' })

// dark/light theme util
const isDark = useDark() //true or false

// variable for debounce function
const darkMode = ref(isDark.value)

const loading = ref(true)

onDeactivated(() => {
  loading.value = true
})

/**
 * debounce function which invoke only once a second to prevent abuse via theme-mode switcher
 * @param {boolean} mode - true if dark theme and false if light theme
 */
const changeDarkMode = useDebounceFn((mode) => {
  // reload iframe only if themes are not equal
  if (mode !== darkMode.value) {
    darkMode.value = mode
  } else {
    loading.value = false
  }
}, 1000)

// whatcher for current theme
watch(isDark, (mode) => {
  loading.value = true
  changeDarkMode(mode)
})

/**
 * iframe loaded event handler
 */
const onFrameLoad = () => {
  setTimeout(() => (loading.value = false), 1000)
}
</script>

<template>
  <div
    class="BI"
    v-loading="loading"
    element-loading-background="var(--el-bg-color)"
    :element-loading-text="`${t('loading')}...`"
    element-loading-custom-class="bi-loading"
  >
    <Transition name="iframe-fade">
      <iframe
        v-show="!loading"
        class="BI-frame"
        title="BI-integration"
        :src="`https://datalens.yandex/lbqnpzipxjbs8?_lang=en&_theme=${darkMode ? 'dark' : 'light'}`"
        @load="onFrameLoad()"
      ></iframe>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.BI {
  width: 100%;
  height: 100%;
  border-radius: var(--el-border-radius-base);

  &-frame {
    width: 100%;
    min-height: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
  }
}

.iframe-fade-enter-active,
.iframe-fade-leave-active {
  transition: opacity 2s;
}

.iframe-fade-enter-from,
.iframe-fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
.bi-loading {
  &.el-loading-mask {
    transition: 1s ease-out;
    z-index: var(--mid-z-index);
    border-radius: var(--el-border-radius-base);
  }
}
</style>
