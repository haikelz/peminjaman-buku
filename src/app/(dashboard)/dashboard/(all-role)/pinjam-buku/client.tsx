"use client";

import { useAtom } from "jotai";
import { Session } from "next-auth";
import { useEffect } from "react";
import customToast from "~components/custom-toast";
import PageNumbers from "~components/page-numbers";
import Table from "~components/table";
import { usePagination } from "~hooks";
import { tw } from "~lib/helpers";
import { MAKS_TGL_PENGEMBALIAN, TGL_PINJAM } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { saveDataToLocalStorage } from "~lib/utils/save-data-to-local-storage";
import { booksAtom, borrowedBooksAtom } from "~store";
import { BorrowedBooksProps } from "~types";

export default function PinjamBukuClient({ session }: { session: Session }) {
  const [books, setBooks] = useAtom(booksAtom);
  const [borrowedBooks, setBorrowedBooks] = useAtom(borrowedBooksAtom);

  const { currentPage, setCurrentPage, pageNumbers, currentData } =
    usePagination(books);

  const currentBooks = currentData.sort(() => -1);

  function handleDelete(id: string) {
    const data = [...books];
    const filteredData = data.filter((item) => item.id !== id);

    setBooks(filteredData);
    saveDataToLocalStorage("books", filteredData);
  }

  async function handleBorrowBook(item: BorrowedBooksProps): Promise<void> {
    const data = [...borrowedBooks];

    data.push({
      ...item,
      tgl_pinjam: TGL_PINJAM,
      tgl_pengembalian: MAKS_TGL_PENGEMBALIAN,
    });

    setBorrowedBooks(data);
    handleDelete(item.id);
    saveDataToLocalStorage("borrowed-books", data);
    customToast({
      text: `Berhasil meminjam buku ${item.title}!`,
      status: "success",
    });

    const { error } = await db.from("peminjam_buku").insert([
      {
        id: item.id,
        user_id: session.user.id,
        created_at: session.user.created_at,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        judul_buku: item.title,
        penulis: item.author,
        tgl_pinjam: TGL_PINJAM,
        maks_tgl_pengembalian: MAKS_TGL_PENGEMBALIAN,
      },
    ]);
    if (error) throw error;
  }

  useEffect(() => {
    if (localStorage.getItem("books")) {
      setBooks(JSON.parse(localStorage.getItem("books") as string));
    }
  }, [setBooks]);

  return (
    <>
      <div className="flex flex-col gap-10 mt-5">
        {books.length ? (
          <Table
            tableHead={
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Id
                </th>
                <th className="min-w-[220px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Judul
                </th>
                <th className="min-w-[150px] py-4 px-4 font-bold text-black dark:text-white">
                  Language
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Penulis
                </th>
                <th className="py-4 px-4 font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            }
            tableData={currentBooks.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <p className="text-sm font-medium">{item.id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black font-medium dark:text-white">
                    {item.language}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={tw(
                      "inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-warning bg-warning"
                    )}
                  >
                    {item.author}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="bg-danger rounded-md px-3.5 text-white font-bold py-1.5"
                      onClick={() => {
                        handleDelete(item.id as string);
                        customToast({
                          text: `Berhasil menghapus buku ${item.title} dari list!`,
                          status: "success",
                        });
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-primary rounded-md px-3.5 text-white font-bold py-1.5"
                      onClick={() => handleBorrowBook(item)}
                    >
                      Pinjam buku
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          />
        ) : (
          <h3 className="text-center font-bold text-2xl">
            List buku yang ingin kamu pinjam tidak ada!
          </h3>
        )}
      </div>
      {currentBooks.length && books.length > 12 ? (
        <PageNumbers
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNumbers={pageNumbers}
        />
      ) : null}
    </>
  );
}
