"use client";

import CSVDownloader from "~components/csv-downloader";
import PageNumbers from "~components/page-numbers";
import Table from "~components/table";
import { usePagination } from "~hooks";
import { tw } from "~lib/helpers";
import { ListUsersProps } from "~types";

export default function ListUsersClient({
  listUsers,
}: {
  listUsers: ListUsersProps[];
}) {
  const { currentData, currentPage, setCurrentPage, pageNumbers } =
    usePagination(listUsers);

  const currentBooks = currentData;

  return (
    <>
      <CSVDownloader filename="list_users" data={listUsers} />
      <div className="flex flex-col gap-10 mt-5">
        {listUsers.length ? (
          <Table
            tableHead={
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Id
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Judul
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Penulis
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Tgl pinjam
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Maks tgl Pengembalian
                </th>
              </tr>
            }
            tableData={currentBooks.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <p className="text-sm font-medium">{item.id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white font-medium">
                    {item.judul_buku}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={tw(
                      "inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-warning bg-warning"
                    )}
                  >
                    {item.penulis}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black font-medium dark:text-white">
                    {item.tgl_pinjam}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black font-medium dark:text-white">
                    {item.maks_tgl_pengembalian}
                  </p>
                </td>
              </tr>
            ))}
          />
        ) : (
          <h3 className="text-center font-bold text-2xl">
            Belum ada user yang meminjam buku!
          </h3>
        )}
      </div>
      {currentBooks.length && listUsers.length > 12 ? (
        <PageNumbers
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageNumbers={pageNumbers}
        />
      ) : null}
    </>
  );
}
