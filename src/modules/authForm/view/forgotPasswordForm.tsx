"use client";

import React from "react";
import {useFormik} from "formik";
import {InputUI} from "@/UI/inputUI";
import {Button} from "@mui/material";
import {forgotPassword} from "../models/forgotPassword";
import {useForgotPassword} from "../hooks/useForgotPassword";
import {forgotPasswordSchema} from "../schemas/forgotPassword";

export function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: forgotPassword,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useForgotPassword();

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
        <Button 
          type="submit"
          variant="contained"
          className="w-full mt-5"
          disabled={!formik.isValid || !Object.values(formik.values).some((value: string) => value.length)}
        >Forgot password</Button>
      </form>
    </>
  );
}