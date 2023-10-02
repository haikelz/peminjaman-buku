import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  SignInWithGithub,
  SignInWithGoogle,
} from "~components/home-login-actions";
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
      <div className="flex flex-col min-h-screen justify-center items-center p-4">
        <form className="flex flex-col justify-center items-center bg-white drop-shadow-lg p-6 rounded-xl">
          <Image src="/logo.svg" alt="logo" width={300} height={300} />
          <h3 className="text-2xl font-bold text-center my-7">
            Login to Sistem Peminjaman Buku
          </h3>
          <div className="flex flex-col justify-center items-center space-y-3 w-full">
            <SignInWithGithub />
            <SignInWithGoogle />
          </div>
          <p className="mt-4">
            Or login as{" "}
            <Link
              href="/login-admin"
              className="font-bold underline underline-offset-2"
            >
              admin
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
