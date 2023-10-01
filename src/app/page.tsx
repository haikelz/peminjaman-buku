import HomeLogin from "~components/home-login";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Sistem Peminjaman Buku",
  description: "A simple book lending system",
};

export default async function Home() {
  const session = await getServerSession(options);

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <>
      <HomeLogin />
    </>
  );
}
