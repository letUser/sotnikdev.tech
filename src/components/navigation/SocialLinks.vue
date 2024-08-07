<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n'
import GitHub from '../icons/GitHub.vue'
import LinkedIn from '../icons/LinkedIn.vue'

// use translation
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="socials">
    <div class="social">
      <a
        class="social-link"
        target="_blank"
        href="https://github.com/letUser"
        :title="t('nav-links-github')"
        id="firstSocialLink"
        ><el-icon :size="24"><git-hub /></el-icon
      ></a>
    </div>

    <div class="social">
      <a
        class="social-link"
        target="_blank"
        href="https://www.linkedin.com/in/sotnik/"
        :title="t('nav-links-li')"
        ><el-icon :size="22"><linked-in /></el-icon
      ></a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.socials {
  display: flex;
  flex-direction: row;

  .social {
    &-link {
      display: block;
      text-decoration: none;
      color: inherit;
      height: 1.5rem;
      padding: 0 0.75rem;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
