import React from "react";
import Link from "next/link";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {ForgotPasswordForm, Info} from "@/modules/authForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Send email to reset password",
};

export default function ForgotPassword() {
  return (
    <>
      <Info
        title="Forgot password?"
        subTitle="Don&lsquo;t worry, we&lsquo;ll send you reset instructions."
      />
      <ForgotPasswordForm/>
      <Link
        href="/auth/sign-in"
        className="mt-5 text-[18px] text-secondary-auth-pages-link text-center block font-medium"
      >
        <Typography variant="body1">Back to log in</Typography>
      </Link>
    </>
  );
}
