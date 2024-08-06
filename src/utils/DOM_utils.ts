/**
 * Calculate fitable number of elements inside of provided parent element width
 * @param {HTMLElement | null} parentElement - html parent element for getting width
 * @param {number} elementWidth - width of one part for calculations
 * @param {Options | undefined} options - options for calculations: { minElements, maxElements, filledSpace }
 * @returns {number} number of parts
 */
export const computeElementsNumber = (
  parentElement: HTMLElement | null,
  elementWidth: number,
  options?: {
    minElements?: number,
    maxElements?: number,
    filledSpace?: number
  }
): number => {
  if (!parentElement) {
    throw new Error('No HTMLElement provided')
  }

  if (elementWidth < 1) {
    throw new Error('elementWidth parameter can\'t be less than 1px')
  }

  const rect: DOMRect = parentElement.getBoundingClientRect()
  const parentWidth: number = options?.filledSpace ? rect.width - options.filledSpace : rect.width

  if (typeof parentWidth !== 'number') {
    throw new Error('Error in width calculation')
  }

  // get the number of fitable elements
  let result = Math.floor(parentWidth / elementWidth)

  if (options?.minElements) {
    result = Math.max(result, options.minElements)
  }

  if (options?.maxElements) {
    result = Math.min(result, options.maxElements)
  }

  return result
}
