"use client";

import { ChildrenProps } from "~types";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";

export default function Wrapper({ children }: ChildrenProps) {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
}
