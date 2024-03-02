import React, {ReactNode} from "react";
import {Header} from "@/components/header";

interface IProps {
  children: ReactNode
}

export default function ProfileLayout({children}: IProps) {
  return (
    <>
      <Header/>
      <main className="h-full w-full p-[24px]">{children}</main>
    </>
  );
}