<script setup lang="ts">
import { inject } from 'vue'
import GitHub from '../icons/GitHub.vue'
import LinkedIn from '../icons/LinkedIn.vue'

const isLIblocked = inject('isLIblocked', false)
</script>

<template>
  <div class="socials">
    <div class="social">
      <a class="social-link" target="_blank" href="https://github.com/letUser" title="Go to GitHub"
        ><el-icon :size="24"><git-hub /></el-icon
      ></a>
    </div>

    <div v-if="isLIblocked" class="social">
      <a
        class="social-link"
        target="_blank"
        href="https://www.linkedin.com/in/sotnik/"
        title="Go to LinkedIn"
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
      text-decoration: none;
      color: inherit;
      height: 1.5rem;

      &:hover {
        color: var(--el-color-primary-dark-1);
      }
    }
  }
}
</style>
