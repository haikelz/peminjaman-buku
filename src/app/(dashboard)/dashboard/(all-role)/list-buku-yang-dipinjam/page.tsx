import { Metadata } from "next";
import Breadcrumb from "~components/breadcrumb";

import ListPeminjamClient from "./client";

export const metadata: Metadata = {
  title: "List buku yang dipinjam",
  description: "List buku yang dipinjam",
};

export default function ListBukuYangDipinjam() {
  return (
    <div>
      <Breadcrumb name="List Buku yang Dipinjam" />
      <ListPeminjamClient />
    </div>
  );
}
