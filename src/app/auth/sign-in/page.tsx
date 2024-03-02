import React from "react";
import Link from "next/link";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {Info, SignInForm} from "@/modules/authForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in in Rivegs account",
};

export default function SignIn() {
  return (
    <>
      <Info
        title="Welcome back"
        subTitle="Welcome back! Please enter your details to log into your account."
      />
      <SignInForm/>
      <article className="mb-3 mt-5 flex items-center justify-center">
        <Typography variant="body1">Don`t have an account?</Typography>
        <Link 
          href="/auth/sign-up"
          className="ml-3 text-[18px] text-main-auth-pages-link font-medium"
        >
          <Typography variant="body1">Sign up</Typography>
        </Link>
      </article>
    </>
  );
}
