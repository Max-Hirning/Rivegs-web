"use client";

import Link from "next/link";
import {useFormik} from "formik";
import {InputUI} from "@/UI/inputUI";
import React, {useState} from "react";
import {signUp} from "../models/signUp";
import {useSignUp} from "../hooks/useSignUp";
import {signUpSchema} from "../schemas/signUp";
import {Button, Checkbox, FormGroup, Typography} from "@mui/material";

export function SignUpForm() {
  const formik = useFormik({
    initialValues: signUp,
    validationSchema: signUpSchema,
    onSubmit: (values, {resetForm}) => {
      mutate(values);
      resetForm();
    },
  });
  const {mutate} = useSignUp();
  const [agreedToPolicy, setAgreedToPolicy] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToPolicy(event.target.checked);
  };

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
          id="login"
          type="text"
          label="Login"
          required={true}
          onBlur={formik.handleBlur}
          placeholder="Hayman Andrews"
          errorMsg={formik.errors.login}
          changeText={formik.handleChange}
          value={formik.values.login || ""}
          error={!!(formik.touched.login && formik.errors.login)}
        />
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
        <FormGroup className="flex-nowrap max-w-fit flex flex-row items-center">
          <Checkbox 
            className="p-0"
            color="primary" 
            onChange={handleChange}
            checked={agreedToPolicy}
          />
          <Link 
            href="/privacy-policy"
            className="ml-[10px] w-[calc(100%-34px)]"
          >
            <Typography variant="subtitle1">I&lsquo;ve read privacy policy and agree</Typography>
          </Link>
        </FormGroup>
        <Button 
          type="submit"
          variant="contained"
          className="w-full mt-5"
          disabled={!formik.isValid || !agreedToPolicy || !Object.values(formik.values).some((value: string) => value.length)}
        >Sign Up</Button>
      </form>
    </>
  );
}