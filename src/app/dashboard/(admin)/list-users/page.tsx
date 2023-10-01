import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import Breadcrumb from "~components/breadcrumb";
import CSVDownloader from "~components/csv-downloader";
import Table from "~components/table";
import { db } from "~lib/utils/db";

export default async function ListUsers() {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

  if (session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  const { data, error } = await db
    .from("peminjam_buku")
    .select(
      "id, user_id, name, judul_buku, penulis, tgl_pinjam, maks_tgl_pengembalian"
    );

  if (error) throw error;

  return (
    <div>
      <Breadcrumb pageName="List Users" />
      <CSVDownloader filename="list_users" data={data} />
      <div className="flex flex-col gap-10 mt-5">
        {data.length ? (
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
            tableData={data.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <p className="text-sm font-medium">{item.user_id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white font-medium">
                    {item.judul_buku}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium text-warning bg-warning`}
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
    </div>
  );
}
