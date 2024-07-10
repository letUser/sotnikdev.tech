<script setup lang="ts">
import { Document } from '@element-plus/icons-vue'

const props = defineProps<{
  data: any[]
  exportLoading: boolean
}>()
</script>

<template>
  <el-popover
    class="exportXLS-popover"
    placement="bottom-start"
    title="Export table on a Client Side"
    :width="440"
    trigger="hover"
  >
    <template #reference>
      <el-button
        type="primary"
        @click="$emit('exportExcel')"
        :disabled="!props.data.length"
        :loading="props.exportLoading"
      >
        <el-icon :size="16"><Document /></el-icon>
        <span>.xls - client</span>
      </el-button>
    </template>
    <template #default>
      <div class="exportXLS-popover-content">
        <span>The most optimized way to export data without server power:</span>
        <div class="exportXLS-popover-content-text">
          <span>
            1) Send data from table to
            <a
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
              title="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
              style="text-decoration: none"
            >
              Worker</a
            >
            - a background thread separated from main rendering thread
          </span>
          <span>
            2) Prepare it with
            <span class="exportXLS-popover-content-text-code">O(rows * columns)</span></span
          >
          <span> 3) Download </span>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
.exportXLS {
  &-popover {
    &-content {
      display: flex;
      flex-direction: column;

      &-text {
        display: inherit;
        flex-direction: inherit;
        padding-top: 8px;
        line-height: 1.5;

        &-code {
          font-family: monospace;
          font-style: italic;
          background-color: var(--el-color-info-light-7);
          padding: 4px;
        }
      }
    }
  }
}
</style>
