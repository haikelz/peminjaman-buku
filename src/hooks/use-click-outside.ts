"use client";

/**
 * A custom hook
 * @param {Dispatch<SetStateAction<boolean>>} set setter
 * @param {RefObject<HTMLDivElement>} ref reference to div element
 */
import { SetStateAction } from "jotai";
import { Dispatch, RefObject, useCallback, useEffect } from "react";
import { saveDataToLocalStorage } from "~lib/utils/save-data-to-local-storage";

export function useClickOutside(
  set: Dispatch<SetStateAction<boolean>>,
  ref: RefObject<HTMLDivElement>,
): void {
  const handleClickOutside = useCallback(
    (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
        set(false);
        saveDataToLocalStorage("is-rekomendasi", false);
      }
    },
    [ref, set],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
}
