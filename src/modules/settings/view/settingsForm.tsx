"use client";

import {useFormik} from "formik";
import {IUserSession} from "@/types";
import {InputUI} from "@/UI/inputUI";
import React, {useState} from "react";
import {AvatarForm} from "./avatarForm";
import {useSession} from "next-auth/react";
import {settings} from "../models/settings";
import {settingsSchema} from "../schemas/settings";
import {useDeleteUser} from "../hooks/useDeleteUser";
import {Button, Box, Typography} from "@mui/material";
import {useUpdateSettings} from "../hooks/useUpdateSettings";

interface IProps {
  user: IUserSession|undefined|null;
}

export function SettingsForm({user}: IProps) {
  const formik = useFormik({
    initialValues: settings,
    validationSchema: settingsSchema,
    onSubmit: async (values, {resetForm}) => {
      const formData: FormData = new FormData();
      (imageFile) && formData.append("image", imageFile);
      (values.login.length > 0) && formData.append("login", values.login);
      (values.email.length > 0) && formData.append("email", values.email);
      (values.description.length > 0) && formData.append("description", values.description);
      resetForm();
      updateUser.mutate(formData);
    },
  });
  const {data} = useSession();
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateSettings();
  const [imageFile, setImageFile] = useState<File|null>(null);

  return (
    <>
      <AvatarForm
        saveImage={(image: File|null) => {
          setImageFile(image);
        }}
        login={data ? `${data.user?.name}` : user?.login}
        initialImg={data ? data.user?.image : user?.image}
      />
      <Typography 
        variant="subtitle1"
        className="my-8 whitespace-normal"
      >Welcome back! Please enter your details to log into your account.</Typography>
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
          onBlur={formik.handleBlur}
          value={formik.values.login}
          errorMsg={formik.errors.login}
          changeText={formik.handleChange}
          error={!!(formik.errors.login && formik.errors.login)}
          placeholder={(data?.user as IUserSession)?.login || user?.login}
        />
        <InputUI
          id="email"
          type="email"
          label="Email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          errorMsg={formik.errors.email}
          changeText={formik.handleChange}
          error={!!(formik.errors.email && formik.errors.email)}
          placeholder={(data?.user as IUserSession)?.email || user?.email}
        />
        <InputUI
          type="text"
          id="description"
          multiline={true}
          label="Description"
          onBlur={formik.handleBlur}
          changeText={formik.handleChange}
          value={formik.values.description}
          errorMsg={formik.errors.description}
          error={!!(formik.errors.description && formik.errors.description)}
          placeholder={(data?.user as IUserSession)?.description || user?.description || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste molestiae minus quis! Aperiam ut alias nihil consectetur delectus. Fugiat sequi provident asperiores dicta illum incidunt velit facilis itaque quos voluptates."}
        />
        <Box>
          <Button 
            type="button"
            color="error"
            variant="outlined"
            className="float-left"
            onClick={() => deleteUser.mutate()}
          >Delete</Button>
          <Button 
            type="submit"
            variant="contained"
            className="float-right"
            disabled={!formik.isValid}
          >Save changes</Button>
        </Box>
      </form>
    </>
  );
}