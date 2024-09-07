import { ElNotification, ElMessage } from 'element-plus'
import WorkerTableExportXLS from '../workers/tableExportXLS?worker'

/**
 * Export function that takes columns and rows and sends them to the Worker for .xls formatting
 * @param {any[]} columns NON-PROXY array of columns
 * @param {any[]} rows NON-PROXY array of rows
 * @param {Function} callback callback method
 * @param {string} fileName specific file name
 * @param {string} worksheet specific name for worksheet
 */
export default function exportXLS(columns: any[], rows: any[], callback: Function, fileName: string = 'export.xls', worksheet: string = 'WorkSheet'): void {
  if (window.Worker) {
    // show Notification with info about start of export
    ElNotification({
      title: 'Please wait',
      message: 'Export occurs in the background',
      type: 'info'
    })

    // create Worker
    const _workerTableExportXLS = new WorkerTableExportXLS()

    // send message to Worker
    _workerTableExportXLS.postMessage({
      columns,
      rows
    })

    // listener of messages from Worker
    _workerTableExportXLS.onmessage = ({ data }) => {
      // terminate Worker
      _workerTableExportXLS.terminate()

      if (data) {
        // create URL for download
        const preparedData = createTemplate(data, worksheet)

        // download XLS
        downloadTable(preparedData, fileName)

        // call callback
        callback()
      } else {
        ElMessage({
          showClose: true,
          message: 'Unexpected error during export. Please, contact administrator.',
          type: 'error'
        })
      }
    }
  } else {
    ElMessage({
      showClose: true,
      message: 'Sorry, but your browser does not support Workers',
      type: 'error'
    })
  }
}

/**
 * Function for URL creation for data download
 * @param {string} table text html of table
 * @param {string} worksheet specific name of worksheet
 * @return {string} prepared data for download
*/
function createTemplate(table: string, worksheet: string): string {
  const template =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>{table}</body></html>'

  const base64 = (s: string) => window.btoa(unescape(encodeURIComponent(s)))

  const format = function (template: string, context: any) {
    return template.replace(/{(\w+)}/g, (m, p) => context[p])
  }

  const ctx = { worksheet, table: table }

  return 'data:application/vnd.ms-excel;base64,' + base64(format(template, ctx))
}

/**
 * Function for XLS download
 * @param {string} data prepared data for download
 * @param {string} fileName specific file name
 * @return {void}
*/
function downloadTable(data: string, fileName: string): void {
  const link = document.createElement('a')
  link.download = fileName
  link.href = data
  link.click()
}