<script setup lang="ts">
import { ref, provide } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import MoonIcon from '../icons/MoonIcon.vue'
import SunIcon from '../icons/SunIcon.vue'

const emit = defineEmits(['updLIScript'])

// dark/light theme util
const isDark = useDark() //true or false
const toggleDark = useToggle(isDark)

// state for theme switcher
const darkMode = ref(isDark.value)
provide('darkMode', darkMode)

/**
 * Dark mode switcher handler
 * @return {void} void
 */
function handleToggleDark(): void {
  toggleDark()

  // if LinkedIn is not blocked - fetch badge with new color scheme
  emit('updLIScript')
}
</script>

<template>
  <div class="theme-switch menu-item">
    <el-switch
      v-model="darkMode"
      @change="handleToggleDark"
      style="
        --el-switch-on-color: var(--el-bg-color-overlay);
        --el-switch-off-color: var(--el-fill-color-dark);
        --el-switch-border-color: var(--el-border-color);
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
</template>

<style scoped lang="scss">
.theme-switch {
  .el-switch {
    cursor: pointer;
  }

  .custom-action {
    width: 100%;
    height: 100%;
    border-radius: 100%;

    &.active {
      background-color: var(--el-color-base-background);
    }
  }

  &:hover {
    .el-switch {
      .custom-action {
        animation: pulse 2s infinite;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--el-color-primary);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 3px var(--el-color-primary-dark-2);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--el-color-primary);
  }
}
</style>
