"use client";

import { atom, useAtomValue } from "jotai";
import { Dispatch, SetStateAction, useState } from "react";

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

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return { currentPage, setCurrentPage, pageNumbers, currentData };
}
