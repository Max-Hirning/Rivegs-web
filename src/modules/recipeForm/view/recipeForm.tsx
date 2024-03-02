"use client";

import React from "react";
import Image from "next/image";
import {useFormik} from "formik";
import {InputUI} from "@/UI/inputUI";
import SelectUI from "@/UI/selectUI";
import {RecipeImage} from "./recipeImage";
import {Theme} from "@mui/material/styles";
import {recipeForm} from "../models/recipeForm";
import {IInitialRecipeForm} from "../types/recipeForm";
import {recipeFormSchema} from "../schemas/recipeForm";
import {StepsIngredientsForm} from "./stepsIngredients";
import {useUpdateRecipe} from "../hooks/useUpdateRecipe";
import {useCreateRecipe} from "../hooks/useCreateRecipe";
import {IRecipeType, useGetRecipeTypes} from "@/modules/sideBars";
import {Typography, MenuItem, Grid, Button, useMediaQuery} from "@mui/material";

interface IProps {
  initialValues?: IInitialRecipeForm|null;
}

export function RecipeForm({initialValues}: IProps) {
  const formik = useFormik({
    validationSchema: recipeFormSchema,
    onSubmit: (values, {setValues}) => {
      const formData = new FormData();
      (values.image) && formData.append("image", (values.image as File));
      (values.title && values.title.length > 0) && formData.append("title", values.title);
      (values.steps.length > 0) && formData.append("steps", JSON.stringify(values.steps));
      (values.typeId && values.typeId.length > 0) && formData.append("typeId", values.typeId);
      (values.ingredients.length > 0) && formData.append("ingredients", JSON.stringify(values.ingredients));
      (values.description && values.description.length > 0) && formData.append("description", values.description);
      setValues(initialValues || {
        title: "",
        steps: [],
        typeId: "",
        image: null,
        description: "",
        ingredients: [],
      });
      if(initialValues) {
        updateRecipe.mutate(formData);
      } else {
        createRecipe.mutate(formData);
      }
    },
    initialValues: initialValues || recipeForm,
  });
  const {data} = useGetRecipeTypes();
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe(initialValues?._id);
  const isSmScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className="flex flex-col max-w-[1000px]"
    >
      <RecipeImage
        saveImage={(image: File) => {
          formik.setFieldValue("image", image);
        }}
        image={formik.values.image || (initialValues?.image as string)}
      />
      <Grid 
        container 
        spacing={2}
      >
        <Grid 
          item 
          xs={12} 
          sm={isSmScreen ? 12 : 6}
        >
          <InputUI
            id="title"
            type="text"
            required={true}
            label="Recipe title"
            placeholder="Cherry tart"
            onBlur={formik.handleBlur}
            value={formik.values.title}
            errorMsg={formik.errors.title}
            changeText={formik.handleChange}
            error={(formik.touched.title && Boolean(formik.errors.title))}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={isSmScreen ? 12 : 6}
        >
          <SelectUI
            id="typeId"
            required={true}
            label="Recipe type"
            onBlur={formik.handleBlur}
            value={formik.values.typeId}
            errorMsg={formik.errors.typeId}
            changeText={formik.handleChange}
            error={!!(formik.errors.typeId && formik.errors.typeId)}
          >
            {
              (data?.data || []).map(({_id, image, title}: IRecipeType) => {
                return(
                  <MenuItem 
                    key={_id} 
                    value={_id}
                  >
                    <Image
                      width={25}
                      height={25}
                      src={image}
                      alt={title}
                      className="mr-[10px]"
                    />
                    <Typography variant="body1">{title}</Typography>
                  </MenuItem>
                );
              })
            }
          </SelectUI>
        </Grid>
        <Grid 
          item 
          xs={12}
        >
          <InputUI
            type="text"
            id="description"
            multiline={true}
            label="Recipe description"
            onBlur={formik.handleBlur}
            changeText={formik.handleChange}
            value={formik.values.description}
            errorMsg={formik.errors.description}
            error={(formik.touched.description && Boolean(formik.errors.description))}
            placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam illum quisquam sunt mollitia voluptates sapiente ratione voluptatem molestias eligendi. Officiis ipsum consequuntur ab accusantium quod, earum ipsam! Modi, enim ducimus?"
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={isMdScreen ? 12 : 6}
        >
          <StepsIngredientsForm
            id="ingredients"
            btnTitle="Add ingredient"
            label="Recipe ingredients"
            data={formik.values.ingredients}
            placeholder="125 g white chocolate"
            handleChange={(data) => formik.setFieldValue("ingredients", data)}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={isMdScreen ? 12 : 6}
        >
          <StepsIngredientsForm
            id="steps"
            multiline={true}
            btnTitle="Add step"
            label="Recipe steps"
            data={formik.values.steps}
            handleChange={(data) => formik.setFieldValue("steps", data)}
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus maxime modi earum debitis nisi quis non labore optio quisquam consequuntur? Accusantium, voluptate suscipit in laboriosam natus rem explicabo fugit ex."
          />
        </Grid>
      </Grid>
      <Button 
        type="submit"
        variant="contained"
        className={`my-10 ${isMdScreen ? "w-full" : "w-60 m-auto"}`}
        disabled={(!formik.isValid) || !formik.values.image || formik.values.steps.length === 0 || formik.values.ingredients.length === 0}
      >Save</Button>
    </form>
  );
}