import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import Breadcrumb from "~components/breadcrumb";
import { db } from "~lib/utils/db";
import { ListUsersProps } from "~types";

import ListUsersClient from "./client";

async function getListUsers(): Promise<ListUsersProps[]> {
  const { data, error } = await db
    .from("peminjam_buku")
    .select("id, user_id, name, judul_buku, penulis, tgl_pinjam, maks_tgl_pengembalian")
    .order("tgl_pinjam", { ascending: false });

  if (error) throw error;
  return data;
}

export default async function ListUsers() {
  const listUsers = await getListUsers();
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

  if (session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  return (
    <div>
      <Breadcrumb name="List Users" />
      <ListUsersClient listUsers={listUsers} />
    </div>
  );
}
