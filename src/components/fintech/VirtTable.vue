<script setup lang="ts">
import { ref, h } from 'vue'
import { TableV2SortOrder } from 'element-plus'
import type { SortBy } from 'element-plus'
import { ElButton } from 'element-plus'

const columns = generateColumns(8)
const data = ref<any[]>([])
const kls = ref<string>('')
const sortState = ref<SortBy>({
  key: 'column-0',
  order: TableV2SortOrder.DESC
})
const currIndex = ref(0)

/** */
function generateColumns(length = 8, prefix = 'column-', props?: any): any[] {
  const cols = Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: !columnIndex ? 'Row ID' : `Column ${columnIndex}`,
    align: !columnIndex ? 'center' : null,
    width: 150,
    sortable: !columnIndex
  }))

  // add tool column for control
  cols.push({
    key: 'tools',
    title: '',
    // render button component
    cellRenderer: ({ rowIndex }: { rowIndex: number }) => {
      return h(
        ElButton,
        { size: 'small', type: 'danger', onClick: () => data.value.splice(rowIndex, 1) },
        () => 'Delete'
      )
    },
    width: 100,
    align: 'center'
  })

  return cols
}

/** */
function generateData(columns: any[], length = 100, prefix = 'row-'): void {
  // drop sort ordering to default
  if (sortState.value.order === TableV2SortOrder.ASC) {
    onSort({
      key: 'column-0',
      order: TableV2SortOrder.DESC
    })
  }

  // add new data to existing
  data.value = data.value.concat(
    Array.from({ length }).map((_, index) => {
      const rowIndex = currIndex.value + index

      return columns.reduce(
        (rowData, column, columnIndex) => {
          if (!columnIndex) {
            rowData[column.dataKey] = rowIndex
          } else {
            rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
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

  currIndex.value = currIndex.value + length
}

/** */
function cellProps({ columnIndex }: any) {
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

/** */
function onSort(sortBy: SortBy): void {
  data.value = data.value.reverse()
  sortState.value = sortBy
}
</script>

<template>
  <div class="virt-table-wrapper">
    <div class="virt-table-buttons">
      <el-button @click="generateData(columns, 100)"> Add 100 items </el-button>
      <el-button type="primary" @click="generateData(columns, 100000)">
        Add 100,000 items
      </el-button>
    </div>

    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :cell-props="cellProps"
          :class="kls"
          :data="data"
          :width="width"
          :height="height"
          :sort-by="sortState"
          @column-sort="onSort"
          class="virt-table"
        >
          <template #empty>
            <div>
              <el-empty />
            </div>
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>

<style scoped lang="scss">
.virt-table {
  &-wrapper {
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-buttons {
    display: flex;
    justify-content: flex-end;
    margin: 12px 0;
  }
}
</style>

<style lang="scss">
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
  background: var(--el-table-row-hover-bg-color);
}

[data-key='hovering-col-0'] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
</style>
