import React from "react";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {SettingsFormWrapper} from "@/modules/settings";

export const metadata: Metadata = {
  title: "Settings",
  description: "My profile settings",
};

export default function Settings() {
  return (
    <>
      <Typography 
        variant="h1"
        className="mb-[50px]"
      >My Settings</Typography>
      <SettingsFormWrapper/>
    </>
  );
}
