"use client";

import React from "react";
import Link from "next/link";
import {useFormik} from "formik";
import {InputUI} from "@/UI/inputUI";
import {signIn} from "../models/signIn";
import {useSignIn} from "../hooks/useSignIn";
import {signInSchema} from "../schemas/signIn";
import {Button, Typography} from "@mui/material";

export function SignInForm() {
  const formik = useFormik({
    initialValues: signIn,
    validationSchema: signInSchema,
    onSubmit: (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useSignIn();

  return (
    <>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
        className="w-full max-w-[436px] flex flex-col gap-[24px]"
      >
        <InputUI
          id="email"
          type="email"
          label="Email"
          required={true}
          onBlur={formik.handleBlur}
          placeholder="example@mail.com"
          errorMsg={formik.errors.email}
          changeText={formik.handleChange}
          value={formik.values.email || ""}
          error={!!(formik.touched.email && formik.errors.email)}
        />
        <InputUI
          id="password"
          required={true}
          type="password"
          label="Password"
          onBlur={formik.handleBlur}
          changeText={formik.handleChange}
          errorMsg={formik.errors.password}
          placeholder="at least 8 characters"
          value={formik.values.password || ""}
          error={!!(formik.touched.password && formik.errors.password)}
        />
        <article>
          <Link 
            href="/auth/forgot-password"
            className="text-end block text-main-auth-pages-link"
          >
            <Typography variant="subtitle1">Forgot password?</Typography>
          </Link>
        </article>
        <Button 
          type="submit"
          variant="contained"
          className="w-full mt-5"
          disabled={!formik.isValid || !Object.values(formik.values).some((value: string) => value.length)}
        >Sign In</Button>
      </form>
    </>
  );
}