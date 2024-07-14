<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useDark } from '@vueuse/core'

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
    <el-watermark :font="font" content="Under development">
      <div style="height: 4000px" />
    </el-watermark>
  </div>
</template>

<style scoped lang="scss">
.watermark-wrapper {
  overflow: hidden;
}
</style>
