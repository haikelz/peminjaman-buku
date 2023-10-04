/**
 * A helper function to randomize array, based on fisher-yates shuffle algorithm
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array<T>} arr
 * @returns {Array<T>} arr
 */
export function randomize<T>(arr: Array<T>): Array<T> {
  for (let i = arr.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    const currentData = arr[i];
    const dataToSwap = arr[swapIndex];
    arr[i] = dataToSwap;
    arr[swapIndex] = currentData;
  }

  return arr;
}
