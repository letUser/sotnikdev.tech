<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import { useDark } from '@vueuse/core'

// use translation
const { t } = useI18n({ useScope: 'global' })

// dark/light theme util
const isDark = useDark() //true or false

const font = reactive({
  color: 'rgba(0, 0, 0, .35)'
})

watch(
  isDark,
  () => {
    font.color = isDark.value ? 'rgba(255, 255, 255, .5)' : 'rgba(0, 0, 0, .5)'
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="watermark-wrapper">
    <el-watermark :font="font" :content="t('under-development')">
      <div style="height: 4000px" />
    </el-watermark>
  </div>
</template>

<style scoped lang="scss">
.watermark-wrapper {
  z-index: var(--mid-z-index);
  overflow: hidden;
}
</style>
