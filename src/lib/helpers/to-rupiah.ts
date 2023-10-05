/**
 * A helper function for convert number to rupiah format
 * @param {number} num
 * @returns {string} value in rupiah format
 */
export function toRupiah(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}
