"use client";

import React from "react";
import {RateUI} from "@/UI/rateUI";
import {IUserSession} from "@/types";
import {RateModal} from "./rateModal";
import {useSession} from "next-auth/react";
import {RecipeForm} from "@/modules/recipeForm";
import {RecipeMenu} from "@/components/recipeMenu";
import {useGetRecipe} from "../hooks/useGetRecipe";
import {useSaveUnSaveRecipe} from "@/modules/settings";
import {useDeleteRecipe} from "../hooks/useDeleteRecipe";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {ConfirmDeleteModal} from "@/components/confirmDeleteModal";
import {Typography, Modal, Paper, IconButton} from "@mui/material";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import {useDeleteRecipeContext, useEditRecipeContext, useRateRecipeContext} from "@/store/modals";

export function Card() {
  const {data} = useGetRecipe();
  const {mutate} = useDeleteRecipe();
  const {data: session} = useSession();
  const editRecipeModal = useEditRecipeContext();
  const rateRecipeModal = useRateRecipeContext();
  const saveUnSaveRecipe = useSaveUnSaveRecipe();
  const deleteRecipeModal = useDeleteRecipeContext();

  if(!data?.data) throw new Error("Error in getting recipe");

  const deleteRecipe = (): void => {
    if(deleteRecipeModal.state.id) {
      mutate(deleteRecipeModal.state.id);
    }
  };

  return (
    <>
      <Modal
        onClose={editRecipeModal.closeModal}
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
        onClose={rateRecipeModal.closeModal}
        open={rateRecipeModal.state.modalStatus}
        className="p-[20px] flex items-center flex-col justify-center"
      >
        <Paper 
          style={{transform: "translate(-50%, -50%)"}}
          className="absolute left-2/4 top-2/4 w-72 bg-white p-4 shadow-xl rounded-lg flex flex-col items-center justify-between"
        >
          <IconButton 
            className="absolute top-[10px] right-[10px]"
            onClick={() => rateRecipeModal.closeModal()}
          >
            <CloseRoundedIcon/>
          </IconButton>
          <RateModal/>
        </Paper>
      </Modal>
      <Modal
        onClose={deleteRecipeModal.closeModal}
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
      <section>
        <div 
          style={{backgroundImage: `url(${data.data.image})`}}
          className="relative max-md:h-[215px] h-[415px] w-full mb-[25px] bg-cover bg-no-repeat bg-center rounded-[4px]"
        >
          <div
            style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)"}}
            className="w-full h-full rounded-[4px] flex flex-col items-end justify-between p-[15px]"
          >
            <div className="justify-between w-full flex">
              <IconButton 
                disabled={!session}
                className="p-0 w-fit h-fit rounded-[16px]"
                onClick={() => rateRecipeModal.openModal(data?.data?.rate || 3)}
              >
                <RateUI rate={data.data.rate.toString()}/>
              </IconButton>
              <RecipeMenu
                recipe={{
                  _id: data.data._id,
                  image: data.data.image,
                  title: data.data.title,
                  steps: data.data.steps,
                  typeId: data.data.type._id,
                  ingredients: data.data.ingredients,
                  description: data.data.description,
                }}
                styleBtn="bg-[white]"
              >
                <MoreHorizRoundedIcon/>
              </RecipeMenu>
            </div>
            <IconButton 
              onClick={() => {
                if(data.data?._id) saveUnSaveRecipe.mutate(data.data._id);
              }}
              className={`bg-[white] ${!session && "hidden"}`}
            >
              {
                (((session?.user as IUserSession)?.savedRecipes || []).includes(data.data._id)) ?
                  <BookmarkRoundedIcon/> :
                  <BookmarkBorderRoundedIcon/>
              }
            </IconButton>
          </div>
        </div>
        <article>
          <Typography 
            variant="h1"
            gutterBottom
            className="whitespace-normal"
          >{data.data.title}</Typography>
          {
            (data.data.description) &&
            data.data.description.split("\n").map((line: string, index: number) => {
              return (
                <Typography 
                  key={index}
                  variant="body1" 
                  className="whitespace-normal" 
                >{line}</Typography>
              );
            })
          }
        </article>
      </section>
    </>
  );
}