/**
 * Initiate ResizeObserver on html element and remove it after one trigger
 * @param {Element | HTMLElement} component html element for observing
 * @param {Function} callback callback method
 * @param {Function | undefined} prefixcall function that triggers before callback (callback should be used with useDebounceFn then)
 */
export default function initResizeObserver(component: Element | HTMLElement, callback: Function, prefixcall?: Function): void {
  const resizeObserver = new ResizeObserver((entries) => {
    if (prefixcall) prefixcall()

    const entry = entries[0]
    const { height, width } = entry.contentRect

    callback(height, width, resizeObserver)
  })

  resizeObserver.observe(component)
}