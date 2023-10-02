import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ChildrenProps } from "~types";
import "./_css/globals.css";
import "./_css/satoshi.css";
import Wrapper from "./wrapper";

export const metadata: Metadata = {
  title: "Sistem Peminjaman Buku",
  description: "A simple book lending system",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Wrapper>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
          <Toaster />
        </Wrapper>
      </body>
    </html>
  );
}
