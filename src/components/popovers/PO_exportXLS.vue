<script setup lang="ts">
import { Document, Download } from '@element-plus/icons-vue'

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
    :width="350"
    trigger="hover"
  >
    <template #reference>
      <el-button
        class="exportXLS-popover-trigger"
        type="primary"
        @click="$emit('exportExcel')"
        :disabled="!props.data.length"
        :loading="props.exportLoading"
      >
        <div class="exportXLS-popover-trigger__isMobile">
          <el-icon :size="24"><Download /></el-icon>
        </div>
        <div class="exportXLS-popover-trigger__isDesktop">
          <el-icon :size="16"><Document /></el-icon>
          <span>Export .xls</span>
        </div>
      </el-button>
    </template>
    <template #default>
      <div class="exportXLS-popover-content">
        <p>The most optimized way to export data without server power:</p>
        <div class="exportXLS-popover-content-text">
          <p>
            1) Send data from table to
            <a
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
              title="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
              style="text-decoration: none"
            >
              Worker</a
            >
            - a background thread separated from the main rendering thread
          </p>
          <p>
            2) Prepare it with
            <span class="exportXLS-popover-content-text-code">O(rows * columns)</span>
          </p>
          <p>3) Download</p>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
.exportXLS {
  &-popover {
    &-trigger {
      &__isMobile {
        display: none;
      }

      &__isDesktop {
        display: flex;
        align-items: center;
      }
    }

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

@media screen and (max-width: 720px) {
  .exportXLS {
    &-popover {
      &-trigger {
        &__isMobile {
          display: block;
        }

        &__isDesktop {
          display: none;
        }
      }
    }
  }
}
</style>
