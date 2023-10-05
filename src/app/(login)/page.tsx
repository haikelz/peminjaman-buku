import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { options } from "../api/auth/[...nextauth]/options";
import { SignInWithGithub, SignInWithGoogle } from "./sign-in-button";

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
    <div className="flex flex-col min-h-screen justify-center items-center p-4">
      <div
        className="flex flex-col justify-center items-center bg-white drop-shadow-lg p-6 rounded-xl"
        data-cy="login"
      >
        <Image src="/logo.svg" alt="logo" width={300} height={300} data-cy="login-logo" />
        <h3 className="text-2xl font-bold text-center my-7 text-black" data-cy="login-title">
          Login to Sistem Peminjaman Buku
        </h3>
        <div className="flex flex-col justify-center items-center space-y-3 w-full">
          <SignInWithGithub data-cy="sign-in-with-github-button" />
          <SignInWithGoogle data-cy="sign-in-with-google-button" />
        </div>
        <p className="mt-4 text-black">
          Or login as{" "}
          <Link
            href="/login-admin"
            className="font-bold underline underline-offset-2"
            data-cy="login-admin-link"
          >
            admin
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
