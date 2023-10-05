"use client";

import { SetStateAction } from "jotai";
import { Dispatch, RefObject, useEffect } from "react";
import { saveDataToLocalStorage } from "~lib/utils/save-data-to-local-storage";

export function useClickOutside(
  set: Dispatch<SetStateAction<boolean>>,
  ref: RefObject<HTMLDivElement>,
): void {
  function handleClickOutside(e: Event) {
    if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
      set(false);
      saveDataToLocalStorage("is-rekomendasi", false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handleClickOutside]);
}
