"use client";

import React from "react";
import {IRecipe} from "../types/recipe";
import {IFilter} from "../types/filters";
import {RecipeForm} from "@/modules/recipeForm";
import {useDeleteRecipe} from "@/modules/recipe";
import {RecipeCard} from "@/components/recipeCard";
import {useGetRecipes} from "../hooks/useGetRecipes";
import {Modal, Paper, IconButton} from "@mui/material";
import {Typography, CircularProgress} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {ConfirmDeleteModal} from "@/components/confirmDeleteModal";
import {useDeleteRecipeContext, useEditRecipeContext} from "@/store/modals";

interface IProps {
  listTitle: string;
  queryRoute: string;
  filters: Partial<IFilter>;
}

export function RecipesList({listTitle, queryRoute, filters}: IProps) {
  const {mutate} = useDeleteRecipe();
  const editRecipeModal = useEditRecipeContext();
  const deleteRecipeModal = useDeleteRecipeContext();
  const {data, isLoading, isError} = useGetRecipes(queryRoute, filters);

  const deleteRecipe = (): void => {
    if(deleteRecipeModal.state.id) {
      mutate(deleteRecipeModal.state.id);
    }
  };

  return (
    <>
      <Modal
        open={editRecipeModal.state.modalStatus}
        className="p-[20px] flex items-center flex-col justify-center"
      >
        <Paper className="h-[-webkit-fill-available] flex flex-col items-end p-[20px] overflow-auto">
          <IconButton 
            className="mb-[10px]"
            onClick={() => editRecipeModal.closeModal()}
          >
            <CloseRoundedIcon/>
          </IconButton>
          <RecipeForm initialValues={editRecipeModal.state.recipe}/>
        </Paper>
      </Modal>
      <Modal
        open={deleteRecipeModal.state.modalStatus}
        className="p-[20px] flex items-center flex-col justify-center"
      >
        <>
          <ConfirmDeleteModal
            confirmDelete={() => deleteRecipe()}
            cancelDelete={() => deleteRecipeModal.closeModal()}
          />
        </>
      </Modal>
      <article className="flex justify-between items-end w-full mb-[25px]">
        <Typography variant="h1">{listTitle}</Typography>
        <Typography 
          variant="subtitle1"
          className="mb-[10px]"
        >{(data?.data?.data || []).length}</Typography>
      </article>
      <div className="gap-[24px] flex flex-wrap justify-center">
        {
          (isLoading) ?
            <CircularProgress className="mt-[25px]"/> :
            (isError) ?
              <Typography variant="body1" color="error">No recipes were found</Typography> :
              (data?.data?.data || []).map(({_id, type, steps, ingredients, title, image, author, description, rate}: IRecipe) => {
                return (
                  <RecipeCard
                    key={_id}
                    _id={_id}
                    rate={rate}
                    type={type}
                    title={title}
                    image={image}
                    steps={steps}
                    author={author}
                    ingredients={ingredients}
                    description={description}
                  />
                );
              })
        }
      </div>
    </>
  );
}