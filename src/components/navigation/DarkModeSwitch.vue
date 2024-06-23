<script setup lang="ts">
import { ref, provide, inject } from 'vue'
import type { Ref } from 'vue'
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

const isLIblocked = inject<Ref>('isLIblocked')

/**
 * Dark mode switcher handler
 * @return {void} void
 */
function handleToggleDark(): void {
  toggleDark()
  if (!isLIblocked?.value) emit('updLIScript')
}
</script>

<template>
  <div class="theme-switch menu-item">
    <el-switch
      v-model="darkMode"
      @change="handleToggleDark"
      style="
        --el-switch-on-color: var(--color-background-mute);
        --el-switch-off-color: var(--vt-c-white-mute);
        --el-switch-border-color: var(--color-border);
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
    animation: fade 0.5s;
  }

  .custom-action {
    width: 100%;
    height: 100%;
    border-radius: 100%;

    &.active {
      background-color: var(--el-color-base-background);
    }

    &.inactive {
      border: 1px solid var(--color-border);
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

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--color-border);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 3px var(--el-color-primary-dark-1);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--color-border);
  }
}
</style>
