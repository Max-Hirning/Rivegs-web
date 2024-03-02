import React from "react";
import Link from "next/link";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {Info, SignUpForm} from "@/modules/authForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up account in Rivegs",
};

export default function SignUp() {
  return (
    <>
      <Info
        title="Create an account"
        subTitle="Create an account to get an easy access to your dream shopping"
      />
      <SignUpForm/>
      <article className="mb-3 mt-5 flex items-center justify-center">
        <Typography variant="body1">Already have an account?</Typography>
        <Link 
          href="/auth/sign-in"
          className="ml-[8px] text-main-auth-pages-link font-medium"
        >
          <Typography variant="body1">Log in</Typography>
        </Link>
      </article>
    </>
  );
}
