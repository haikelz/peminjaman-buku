import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type BooksProps = {
  id?: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
};

export type BorrowedBooksProps = {
  id: number;
  created_at: string;
  tgl_pinjam: string;
  tgl_pengembalian: string;
} & BooksProps;
