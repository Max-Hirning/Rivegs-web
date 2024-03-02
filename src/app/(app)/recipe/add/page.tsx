import React from "react";
import type {Metadata} from "next";
import {Typography} from "@mui/material";
import {RecipeFormWrapper} from "@/modules/recipeForm";

export const metadata: Metadata = {
  title: "Add recipe",
  description: "Add new recipe",
};

export default function AddRecipe() {
  return (
    <>
      <Typography 
        variant="h1"
        className="mb-[30px]"
      >Add Recipe</Typography>
      <RecipeFormWrapper/>
    </>
  );
}
