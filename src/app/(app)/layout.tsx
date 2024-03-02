import {IUserSession} from "@/types";
import React, {ReactNode} from "react";
import {Header} from "@/components/header";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/authOptions";
import {ProfileSideBar} from "@/components/profileSideBar";

interface IProps {
  children: ReactNode
}

export default async function AppLayout({children}: IProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header>
        <ProfileSideBar user={session?.user as IUserSession}/>
      </Header>
      <main className="flex h-full w-full">
        <ProfileSideBar 
          user={session?.user as IUserSession}
          styles="max-lg:hidden z-50 bg-white fixed h-screen max-lg:hidden"
        />
        <section className="flex flex-col lg:w-[calc(100%-250px)] max-lg:w-full p-[24px] lg:ml-[250px] max-lg:items-center">{children}</section>
      </main>
    </>
  );
}