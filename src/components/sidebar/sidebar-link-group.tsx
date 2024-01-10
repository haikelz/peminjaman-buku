"use client";

import { atom, useAtom } from "jotai";
import { ReactNode, useMemo } from "react";

type SidebarLinkGroupProps = {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
};

export function SidebarLinkGroup({ children, activeCondition }: SidebarLinkGroupProps) {
  /**
   * @see https://jotai.org/docs/core/atom#note-about-creating-an-atom-in-render-function
   */
  const isOpenAtom = useMemo(() => atom<boolean>(activeCondition), [activeCondition]);

  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return <li>{children(handleClick, isOpen)}</li>;
}
