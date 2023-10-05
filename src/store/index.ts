import { atom } from "jotai";
import { BooksProps, BorrowedBooksProps } from "~types";

export const borrowedBooksAtom = atom<BorrowedBooksProps[] | []>([]);
export const booksAtom = atom<BooksProps[] | []>([]);
export const searchBookAtom = atom<string>("");
