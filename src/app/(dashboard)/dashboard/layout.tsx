import { ChildrenProps } from "~types";
import Wrapper from "./wrapper";

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
