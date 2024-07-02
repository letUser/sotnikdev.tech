<script setup lang="ts">
import GitHub from '../icons/GitHub.vue'
import LinkedIn from '../icons/LinkedIn.vue'
</script>

<template>
  <div class="socials">
    <div class="social">
      <a
        class="social-link"
        target="_blank"
        href="https://github.com/letUser"
        title="Go to GitHub"
        id="firstSocialLink"
        ><el-icon :size="24"><git-hub /></el-icon
      ></a>
    </div>

    <div class="social">
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
      display: block;
      text-decoration: none;
      color: inherit;
      height: 1.5rem;
      padding: 0 0.75rem;
      animation: fade 0.5s;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
