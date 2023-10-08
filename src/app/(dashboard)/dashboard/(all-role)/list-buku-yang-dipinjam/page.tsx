import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import Breadcrumb from "~components/breadcrumb";

import ListPeminjamClient from "./client";

export const metadata: Metadata = {
  title: "List buku yang dipinjam",
  description: "List buku yang dipinjam",
};

export default async function ListBukuYangDipinjam() {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      <Breadcrumb name="List Buku yang Dipinjam" />
      <ListPeminjamClient />
    </div>
  );
}
