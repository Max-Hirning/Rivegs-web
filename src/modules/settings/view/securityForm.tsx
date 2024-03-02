"use client";

import React from "react";
import {useFormik} from "formik";
import {InputUI} from "@/UI/inputUI";
import {Button} from "@mui/material";
import {security} from "../models/security";
import {securitySchema} from "../schemas/security";
import {useUpdateSecurity} from "../hooks/useUpdateSecurity";

export function SecurityForm() {
  const formik = useFormik({
    initialValues: security,
    validationSchema: securitySchema,
    onSubmit: (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useUpdateSecurity();

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
          required={true}
          type="password"
          id="oldPassword"
          label="Old password"
          onBlur={formik.handleBlur}
          changeText={formik.handleChange}
          placeholder="at least 8 characters"
          errorMsg={formik.errors.oldPassword}
          value={formik.values.oldPassword || ""}
          error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
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
        >Change password</Button>
      </form>
    </>
  );
}