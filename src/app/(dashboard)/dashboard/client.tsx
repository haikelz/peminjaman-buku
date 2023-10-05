"use client";

import { useAtom, useAtomValue } from "jotai";
import { customAlphabet } from "nanoid";
import Image from "next/image";
import { useDeferredValue, useMemo } from "react";
import reactStringReplace from "react-string-replace";
import customToast from "~components/custom-toast";
import PageNumbers from "~components/page-numbers";
import { usePagination } from "~hooks";
import { saveDataToLocalStorage } from "~lib/utils/save-data-to-local-storage";
import { booksAtom, searchBookAtom } from "~store";
import { BooksProps } from "~types";

const nanoid = customAlphabet("1234567890", 8);

export default function DashboardClient({ booksData }: { booksData: BooksProps[] }) {
  const [books, setBooks] = useAtom(booksAtom);

  const searchBook = useAtomValue(searchBookAtom);

  const { currentPage, setCurrentPage, currentData, pageNumbers } = usePagination(booksData);

  const currentBooks: BooksProps[] = currentData;

  const deferredSearch = useDeferredValue(searchBook);

  function handleAdd(item: BooksProps) {
    const newBooks = [...books];
    newBooks.push({ ...item, id: nanoid() });

    setBooks(newBooks);
    saveDataToLocalStorage("books", newBooks);
    customToast({ text: "Sudah dimasukkan ke dalam list!", status: "success" });
  }

  const memoizedFilteredData = useMemo(
    () =>
      currentBooks.filter((item) => {
        if (deferredSearch === "") {
          return item;
        } else if (item.title.toLowerCase().includes(deferredSearch.toLowerCase())) {
          return item;
        }
      }),
    [deferredSearch, currentBooks],
  );

  return (
    <>
      {memoizedFilteredData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 grid-rows-1 gap-10">
          {memoizedFilteredData.map((item, index) => (
            <div
              key={index + 1}
              className="dark:bg-graydark bg-bodydark1 rounded-md overflow-hidden"
            >
              <Image
                src={item.imageLink}
                width={500}
                height={500}
                className="aspect-square w-full"
                alt={item.title}
              />
              <div className="p-4">
                <div className="mb-4">
                  <p className="font-bold text-2xl">
                    {deferredSearch
                      ? reactStringReplace(
                          item.title,
                          deferredSearch,
                          (match: string, index: number) => (
                            <span key={index + 1} className="bg-meta-6 dark:text-black">
                              {match}
                            </span>
                          ),
                        )
                      : item.title}
                  </p>
                  <p className="text-lg">
                    Penulis: <span className="font-bold">{item.author}</span>
                  </p>
                  <p className="text-lg">
                    Bahasa: <span className="font-bold">{item.language}</span>
                  </p>
                  <p className="text-lg">
                    Jumlah halaman: <span className="font-bold">{item.pages}</span>
                  </p>
                </div>
                <div className="w-full flex justify-end items-center">
                  <button
                    type="button"
                    aria-label="pinjam buku"
                    onClick={() => handleAdd(item)}
                    className="bg-primary px-3 py-1.5 text-white font-bold rounded-md w-fit"
                  >
                    Masukkan ke Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center font-bold text-2xl">Tidak ada data!</h3>
      )}
      {currentBooks.length && booksData.length > 12 ? (
        <PageNumbers
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNumbers={pageNumbers}
        />
      ) : null}
    </>
  );
}
