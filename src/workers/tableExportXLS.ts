self.onmessage = (event) => {
  tableExportXLS(event.data.columns, event.data.rows)
}

/**
 * Create XLS table and export it as XLS file
 * @param {any[]} columns table columns
 * @param {any[]} rows table data
 */
function tableExportXLS(columns: any[], rows: any[]) {
  let template = '<table><thead><tr>'

  // create columns and append it to table as a header
  columns.forEach((column: any) => {
    const b = `<b>${column.title}</b>`
    const th = `<th>${b}</th>`

    template = template + th
  })

  template = template + '</tr></thead><tbody>'

  // create rows and append it to table as a body
  rows.forEach((row: any) => {
    let tr = '<tr>'

    columns.forEach((column: any) => {
      const td = `<td>${row[column.dataKey]}</td>`
      tr = tr + td
    })

    tr = tr + '</tr>'

    template = template + tr
  })

  template = template + '</tbody>'

  postMessage(template)
}
