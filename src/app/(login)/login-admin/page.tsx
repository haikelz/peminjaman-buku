import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";

import LoginAdminClient from "./client";

export const metadata: Metadata = {
  title: "Login as Admin Role",
  description: "Login as Admin Role ",
};

export default async function LoginAdmin() {
  const session = await getServerSession(options);

  if (session) {
    return redirect("/dashboard");
  }

  return <LoginAdminClient />;
}
