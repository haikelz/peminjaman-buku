"use client";

import { atom, useAtomValue } from "jotai";
import { Dispatch, SetStateAction, useState } from "react";

/**
 * A custom hook to handle pagination.
 * Basically we set the total of all data, total data per page, and page numbers(total of all data / total data per page)
 * @param {Array<T>} data
 * @return {Object} currentPage, setCurrentPage, pageNumbers, currentData
 */

const dataPerPageAtom = atom<number>(12);

type UsePaginationProps<T> = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageNumbers: number[];
  currentData: Array<T>;
};

export function usePagination<T>(data: Array<T>): UsePaginationProps<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dataPerPage = useAtomValue(dataPerPageAtom);

  const indexOfLastData: number = currentPage * dataPerPage;
  const indexOfFirstData: number = indexOfLastData - dataPerPage;

  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const pageNumbers: number[] = new Array(Math.ceil(data.length / dataPerPage))
    .fill(null)
    .map((_, index) => index + 1);

  return { currentPage, setCurrentPage, pageNumbers, currentData };
}
