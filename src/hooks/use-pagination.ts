"use client";

import { atom, useAtom, useAtomValue } from "jotai";

const currentPageAtom = atom<number>(1);
const dataPerPageAtom = atom<number>(12);

export function usePagination(data: any[]) {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
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
