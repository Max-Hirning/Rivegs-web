import React from "react";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {SecurityForm} from "@/modules/settings";

export const metadata: Metadata = {
  title: "Security",
  description: "My profile security",
};

export default function Security() {
  return (
    <>
      <Typography 
        variant="h1"
        className="mb-[50px]"
      >My Security</Typography>
      <SecurityForm/>
    </>
  );
}
