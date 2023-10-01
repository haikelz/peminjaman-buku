import { BooksProps, BorrowedBooksProps } from "~types";
import { atom } from "jotai";

export const borrowedBooksAtom = atom<BorrowedBooksProps[] | []>([]);
export const booksAtom = atom<BooksProps[] | []>([]);
export const searchBookAtom = atom<string>("");
