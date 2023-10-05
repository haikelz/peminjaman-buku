import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A helper function to merge clsx and tailwind-merge
 * @param {ClassValue[]} classes
 */
export function tw(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}
