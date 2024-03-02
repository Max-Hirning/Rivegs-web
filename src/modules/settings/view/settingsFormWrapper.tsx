import React from "react";
import {IUserSession} from "@/types";
import {SettingsForm} from "./settingsForm";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/authOptions";

export async function SettingsFormWrapper() {
  const session = await getServerSession(authOptions);

  return (
    <section className="max-w-[459px] w-full">
      <SettingsForm user={session?.user as IUserSession}/>
    </section>
  );
}