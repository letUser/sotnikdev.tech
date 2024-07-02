/**
 * Initiate ResizeObserver on html element and remove it after one trigger
 * @param {Element | HTMLElement} component html element for observing
 * @param {Function} callback callback method
 */
export default function initResizeObserver(component: Element | HTMLElement, callback: Function): void {
  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    const { height, width } = entry.contentRect

    callback(height, width, resizeObserver)
  })

  resizeObserver.observe(component)
}