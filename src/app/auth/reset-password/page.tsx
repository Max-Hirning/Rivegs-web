import React from "react";
import Link from "next/link";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {redirect} from "next/navigation";
import {Info, ResetPasswordForm} from "@/modules/authForm";

interface IProps {
  searchParams: {
    code: string;
  };
}

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset password in Rivegs",
};

export default function ResetPassword({searchParams}: IProps) {
  if(!searchParams.code || searchParams.code.length === 0) redirect("/auth/sign-in");

  return (
    <>
      <Info
        title="Reset password"
        subTitle="Please create new password here"
      />
      <ResetPasswordForm/>
      <Link 
        href="/auth/sign-in"
        className="mt-5 text-[18px] text-secondary-auth-pages-link text-center block font-medium"
      >
        <Typography variant="body1">Back to log in</Typography>
      </Link>
    </>
  );
}
