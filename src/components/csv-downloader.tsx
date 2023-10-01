"use client";

import { CSVLink } from "react-csv";

type CSVDownloaderProps = {
  filename: string;
  data: {
    id: number;
    user_id: string;
    name: string;
    judul_buku: string;
    penulis: string;
    tgl_pinjam: string;
    maks_tgl_pengembalian: string;
  }[];
};

export default function CSVDownloader({ filename, data }: CSVDownloaderProps) {
  return (
    <CSVLink
      filename={filename}
      data={data}
      className="bg-primary text-white px-4 py-1.5 rounded-md font-bold"
      target="_blank"
    >
      Download CSV
    </CSVLink>
  );
}
