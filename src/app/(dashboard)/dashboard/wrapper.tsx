"use client";

import { atom, useAtom } from "jotai";
import Header from "~components/header";
import Sidebar from "~components/sidebar";
import { ChildrenProps } from "~types";

const sidebarOpenAtom = atom<boolean>(false);

export default function Wrapper({ children }: ChildrenProps) {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
        </main>
      </div>
    </>
  );
}
