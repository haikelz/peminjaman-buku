import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import Breadcrumb from "~components/breadcrumb";
import { db } from "~lib/utils/db";
import ListUsersClient from "./client";

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
      <ListUsersClient data={data} />
    </div>
  );
}
