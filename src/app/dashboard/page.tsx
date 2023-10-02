import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ofetch } from "ofetch";
import { options } from "~app/api/auth/[...nextauth]/options";
import Breadcrumb from "~components/breadcrumb";
import customToast from "~components/custom-toast";
import { env } from "~env.mjs";
import DashboardClient from "./client";

const { DEVELOPMENT_URL, PRODUCTION_URL } = env;

const condition = process.env.NODE_ENV;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

async function getBooks() {
  try {
    const response = await ofetch(
      `${
        condition === "development" ? DEVELOPMENT_URL : PRODUCTION_URL
      }/api/books`,
      {
        method: "GET",
        responseType: "json",
        parseResponse: JSON.parse,
      }
    );

    return response;
  } catch (err: any) {
    console.error(err);
    customToast({ text: err, status: "error" });
  }
}

export default async function Dashboard() {
  const session = await getServerSession(options);
  const booksData = await getBooks();

  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      <Breadcrumb pageName="Dashboard" />
      <DashboardClient booksData={booksData.data} />
    </div>
  );
}
