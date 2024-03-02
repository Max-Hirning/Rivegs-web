"use client";

import React from "react";
import {useFormik} from "formik";
import {InputUI} from "@/UI/inputUI";
import {Button} from "@mui/material";
import {resetPassword} from "../models/resetPassword";
import {useResetPassword} from "../hooks/useResetPassword";
import {resetPasswordSchema} from "../schemas/resetPassword";

export function ResetPasswordForm() {
  const formik = useFormik({
    initialValues: resetPassword,
    validationSchema: resetPasswordSchema,
    onSubmit: (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useResetPassword();

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
        <InputUI
          type="password"
          required={true}
          id="confirmPassword"
          label="Confirm password"
          onBlur={formik.handleBlur}
          placeholder="Hayman Andrews"
          changeText={formik.handleChange}
          errorMsg={formik.errors.confirmPassword}
          value={formik.values.confirmPassword || ""}
          error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
        />
        <Button 
          type="submit"
          variant="contained"
          className="w-full mt-5"
          disabled={!formik.isValid || !Object.values(formik.values).some((value: string) => value.length)}
        >Reset password</Button>
      </form>
    </>
  );
}