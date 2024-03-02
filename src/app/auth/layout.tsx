import Link from "next/link";
import Image from "next/image";
import React, {ReactNode} from "react";

interface IProps {
  children: ReactNode
}

export default function AuthLayout({children}: IProps) {
  return (
    <>
      <header className="mb-[30px] bg-white border-b border-[#EAECF0] sticky left-0 top-0">
        <Link 
          href="/"
          className="block w-fit"
        >
          <Image
            width={100}
            height={100}
            alt="App logo"
            priority={true}
            src="/icons/logo.svg"
          />
        </Link>
      </header>
      <main className="flex flex-col items-center p-[24px]">
        {children}
      </main>
    </>
  );
}