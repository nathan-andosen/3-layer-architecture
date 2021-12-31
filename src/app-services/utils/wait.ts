

/**
 * Wait method
 *
 * @export
 * @param {number} ms
 * @returns {Promise<void>}
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, ms);
  });
};