import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import Breadcrumb from "~components/breadcrumb";
import RekomendasiBuku from "~components/rekomendasi-buku";
import PinjamBukuClient from "./client";

export const metadata: Metadata = {
  title: "Pinjam Buku",
  description: "Pinjam Buku",
};

export default async function PinjamBuku() {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      <Breadcrumb name="Pinjam Buku" />
      <PinjamBukuClient session={session} />
    </div>
  );
}
