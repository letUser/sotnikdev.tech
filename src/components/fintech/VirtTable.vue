<script setup lang="ts">
import 'element-plus/es/components/notification/style/css'
import { ref, h, inject, onMounted } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import type { Ref } from 'vue'
import { TableV2SortOrder } from 'element-plus'
import type { SortBy } from 'element-plus'
import { ElButton } from 'element-plus'
import axios from 'axios'
import { Download } from '@element-plus/icons-vue'
import PO_exportXLS from '../popovers/PO_exportXLS.vue'
import { computeElementsNumber } from '../../utils/DOM_utils'
import exportXLS from '../../utils/exportXLS'

onMounted(() => {
  // generate columns for table
  columns = generateColumns(
    computeElementsNumber(document.getElementById('virt-table-id'), 134, {
      minElements: 2,
      maxElements: 8,
      filledSpace: 100
    })
  )

  // generate initial table data
  generateData(columns, 10000)
})

// use translation
const { t } = useI18n({ useScope: 'global' })

const virtTable: Ref<any> = ref(null)
let columns: any[] = []
let rawData: any[] = []
const data = ref<any[]>([])
let currentClientY = 0
let prevClientY = -1
const controlMode = ref(false)
const kls = ref<string>('')
const sortState = ref<SortBy>({
  key: 'column-0',
  order: TableV2SortOrder.DESC
})
const currIndex = ref(0)
const exportLoading = ref(false)
const exportLambdaLoading = ref(false)

// flag of mobile devices
const isMobile = inject('isMobile') as Ref<boolean>

/**
 * Function to build columns array for the table
 * @param {number} length number of columns
 * @param {string} prefix prefix for column name
 * @param {object} props additional data for column object
 * @returns {any[]} array of columns
 */
const generateColumns = (length: number = 8, prefix: string = 'column-', props?: any): any[] => {
  const cols = Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: !columnIndex ? 'ID' : `${t('fintech-virt-table-header-column')} ${columnIndex}`,
    align: !columnIndex ? 'center' : null,
    width: 150,
    sortable: !columnIndex
  }))

  // add tool column for control
  cols.push({
    key: 'tools',
    title: '',
    dataKey: 'tools',
    // render button component
    cellRenderer: ({ rowIndex }: { rowIndex: number }) => {
      return h(
        ElButton,
        {
          size: 'small',
          type: 'danger',
          disabled: isMobile.value && !controlMode.value,
          onClick: () => onDeleteRow(rowIndex)
        },
        () => t('fintech-virt-table-delete')
      )
    },
    width: 100,
    align: 'center'
  })

  return cols
}

/**
 * Function to build rows array with cells & data for the table
 * @param {any[]} columns array of columns
 * @param {number} length number of rows
 * @param {string} prefix prefix for row name
 * @returns {void}
 */
const generateData = (columns: any[], length: number = 100, prefix: string = 'row-'): void => {
  // drop sort ordering to default
  if (sortState.value.order === TableV2SortOrder.ASC) {
    onSort({
      key: 'column-0',
      order: TableV2SortOrder.DESC
    })
  }

  // add new data to existing
  rawData = rawData.concat(
    Array.from({ length }).map((_, index) => {
      const rowIndex = currIndex.value + index

      return columns.reduce(
        (rowData, column, columnIndex) => {
          if (!columnIndex) {
            rowData[column.dataKey] = rowIndex
          } else if (column.key === 'tools') {
            rowData[column.dataKey] = null
          } else {
            rowData[column.dataKey] =
              `${t('fintech-virt-table-body-row')} ${rowIndex} - ${t('fintech-virt-table-body-col')} ${columnIndex}`
          }

          return rowData
        },
        {
          id: `${prefix}${rowIndex}`,
          parentId: null
        }
      )
    })
  )

  // add new data to existing
  data.value = rawData

  currIndex.value = currIndex.value + length
}

/**
 * Hovering by mouse on a row handler
 * @param {any} props data of the hovered row object
 */
const cellProps = ({ columnIndex }: any) => {
  const key = `hovering-col-${columnIndex}`

  return {
    ['data-key']: key,
    onMouseenter: () => {
      kls.value = key
    },
    onMouseleave: () => {
      kls.value = ''
    }
  }
}

/**
 * Touch move event handler to proceed like a scroll for mobile devices
 * @param {TouchEvent} $ev - touch event
 */
const onTouchMove = ($ev: TouchEvent) => {
  $ev.preventDefault()

  const touchData: Touch = $ev.touches[0]

  if (touchData) {
    const scrollDistance =
      touchData.clientY < prevClientY ? currentClientY + 192 : currentClientY - 192

    virtTable.value.scrollToTop(scrollDistance)

    currentClientY = scrollDistance
    prevClientY = touchData.clientY
  }
}

/**
 * Column sorting handler
 * @param {SortBy} sortBy table sorting data
 */
const onSort = (sortBy: SortBy) => {
  rawData = rawData.reverse()
  sortState.value = sortBy
}

/**
 * Delete row handler
 * @param {number} rowIndex deleting row index
 */
const onDeleteRow = (rowIndex: number) => {
  data.value.splice(rowIndex, 1)
}

/**
 * Export .xls on a client side handler
 */
const exportExcel = () => {
  exportLoading.value = true

  const callback = () => (exportLoading.value = false)

  // call export util. arguments must have to be Not Proxy objects
  exportXLS(
    columns.slice(0, columns.length - 1), //remove 'tools' column
    rawData,
    callback
  )
}

/**
 * Export .xls via Cloud handler
 */
const exportExcelLambda = async () => {
  exportLambdaLoading.value = true

  await axios({
    method: 'post',
    url: '/api/exportXLS',
    data: {
      columns: columns.slice(0, columns.length - 1), //remove 'tools' column
      rows: rawData
    }
  })

  exportLambdaLoading.value = false
}
</script>

<template>
  <div class="virt-table-wrapper">
    <div class="virt-table-info">
      <div class="virt-table-info-data">
        <b>{{ t('fintech-virt-table-total') }}</b
        >: {{ data.length.toLocaleString('en-EN') }}
      </div>
      <div class="virt-table-info-buttons">
        <el-button @click="generateData(columns, 1000)" :disabled="data.length > 536000">
          {{ isMobile ? t('fintech-virt-table-mobile-add') : t('fintech-virt-table-add') }} 1,000
        </el-button>
        <el-button
          type="primary"
          @click="generateData(columns, 100000)"
          :disabled="data.length > 436000"
        >
          {{ isMobile ? t('fintech-virt-table-mobile-add') : t('fintech-virt-table-add') }} 100,000
        </el-button>
        <PO_exportXLS :data="data" :exportLoading="exportLoading" @exportExcel="exportExcel" />
        <el-button
          v-if="false"
          type="primary"
          @click="exportExcelLambda"
          :disabled="!data.length"
          :loading="exportLambdaLoading"
        >
          <p v-if="!isMobile">{{ t('fintech-virt-table-trigger-export') }}</p>
          <el-icon v-else :size="24"><Download /></el-icon>
        </el-button>
      </div>
    </div>

    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          ref="virtTable"
          :columns="columns"
          :cell-props="!isMobile ? cellProps : null"
          :class="!isMobile ? kls : null"
          :data="data"
          :width="width"
          :height="height"
          :sort-by="sortState"
          @column-sort="onSort"
          class="virt-table"
          id="virt-table-id"
        >
          <template #empty>
            <div>
              <el-empty />
            </div>
          </template>
          <template v-if="isMobile && !controlMode" #overlay>
            <div style="width: 100%; height: 100%" @touchmove="onTouchMove" />
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>

    <div v-if="isMobile" class="virt-table-footer">
      <el-divider class="virt-table-footer-divider" />
      <el-switch
        v-model="controlMode"
        class="virt-table-footer-switch"
        style="
          --el-switch-on-color: var(--el-color-primary);
          --el-switch-off-color: var(--el-color-primary);
        "
        :active-text="t('fintech-virt-table-mobile-control')"
        :inactive-text="t('fintech-virt-table-mobile-scroll')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.virt-table {
  &-wrapper {
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  &-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-data {
      display: flex;
      align-items: center;

      > b {
        font-weight: bolder;
      }
    }

    &-buttons {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin: 16px 0;
    }
  }

  &-footer {
    &-divider {
      margin-top: 0;
    }
  }
}

.overlay-scrolling-container {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'] {
  background: var(--el-table-row-hover-bg-color);
}

[data-key='hovering-col-0'] {
  font-weight: bold;
}

.el-table-v2__overlay {
  z-index: var(--mid-z-index);
}
</style>
