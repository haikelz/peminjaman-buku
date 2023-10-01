"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import customToast from "~components/custom-toast";
import Table from "~components/table";
import { tw } from "~lib/helpers";
import { MAKS_TGL_PENGEMBALIAN, TGL_PINJAM } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { saveDataToLocalStorage } from "~lib/utils/save-data-to-local-storage";
import { borrowedBooksAtom } from "~store";

export default function ListBukuYangDipinjamClient() {
  const [borrowedBooks, setBorrowedBooks] = useAtom(borrowedBooksAtom);

  async function handleReturnBook(id: number, title: string) {
    if (TGL_PINJAM > MAKS_TGL_PENGEMBALIAN) {
      customToast({
        text: "Kamu telat mengembalikan buku!",
        status: "error",
      });
      return;
    }

    const data = [...borrowedBooks];
    const filteredData = data.filter((item) => item.id !== id);

    setBorrowedBooks(filteredData);
    saveDataToLocalStorage("borrowed-books", filteredData);
    customToast({
      text: `Terima kasih telah mengembalikan buku ${title} tepat waktu!`,
      status: "success",
    });

    const { error } = await db.from("peminjam_buku").delete().eq("id", id);
    if (error) throw error;
  }

  useEffect(() => {
    if (localStorage.getItem("borrowed-books")) {
      setBorrowedBooks(
        JSON.parse(localStorage.getItem("borrowed-books") as string)
      );
    }
  }, [setBorrowedBooks]);

  return (
    <div className="flex flex-col gap-10 mt-5">
      {borrowedBooks.length ? (
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
                Penulis
              </th>
              <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                Tgl pinjam
              </th>
              <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                Maks tgl Pengembalian
              </th>
              <th className="py-4 px-4 font-bold text-black dark:text-white">
                Actions
              </th>
            </tr>
          }
          tableData={borrowedBooks.map((item, key) => (
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
                <p
                  className={tw(
                    "inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-warning bg-warning"
                  )}
                >
                  {item.author}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black font-medium dark:text-white">
                  {item.tgl_pinjam}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black font-medium dark:text-white">
                  {item.tgl_pengembalian}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center">
                  <button
                    className="bg-primary rounded-md px-3.5 text-white font-bold py-1.5"
                    onClick={() => handleReturnBook(item.id, item.title)}
                  >
                    Kembalikan
                  </button>
                </div>
              </td>
            </tr>
          ))}
        />
      ) : (
        <h3 className="text-center font-bold text-2xl">
          List buku yang dipinjam kosong!
        </h3>
      )}
    </div>
  );
}
