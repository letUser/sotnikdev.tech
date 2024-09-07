<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'petite-vue-i18n'

// use translation
const { t } = useI18n({ useScope: 'global' })

const isClosed = ref(localStorage.getItem('sotnikdev.tech:cookieClosed') === 'true' ? true : false)

const onCookieClose = () => {
  localStorage.setItem('sotnikdev.tech:cookieClosed', 'true')
  isClosed.value = true
}
</script>

<template>
  <div v-if="!isClosed" class="cookie">
    <p class="cookie-text">
      {{ t('cookie-text') }}
    </p>
    <el-button class="cookie-button" @click="onCookieClose()">Accept</el-button>
  </div>
</template>

<style lang="scss">
.cookie {
  display: flex;
  align-items: center;
  position: fixed;
  width: 510px;
  height: fit-content;
  bottom: 24px;
  left: 12px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  padding: 12px 0 12px 12px;
  backdrop-filter: saturate(75%) blur(4px);
  -webkit-backdrop-filter: saturate(75%) blur(4px);
  z-index: var(--max-z-index);
  box-shadow:
    0px -1px 1px rgba(0, 0, 0, 0.08),
    1px 0px 1px rgba(0, 0, 0, 0.08),
    -1px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 1px rgba(0, 0, 0, 0.08);
  background-color: color-mix(in srgb, var(--el-bg-color), #0000 35%);
  font-size: 12px;

  &-text {
    text-align: justify;
  }

  &-button {
    margin: 12px;
    font-size: 12px;
  }
}

@media screen and (max-width: 515px) {
  .cookie {
    width: 95%;
    flex-direction: column;
    padding: 12px 12px 0 12px;

    &-button {
      width: 100%;
    }
  }
}

@media screen and (max-height: 310px) {
  .cookie {
    width: 95%;
  }
}
</style>
