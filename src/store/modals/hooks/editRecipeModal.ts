"use client";

import {useContext, useReducer} from "react";
import {IInitialRecipeForm} from "@/modules/recipeForm";
import {IEditRecipeModalStore} from "../types/editRecipeModal";
import {editRecipeModalReducer} from "../controllers/editRecipeModal";
import {EditRecipeModalContext, editRecipeModal} from "../models/editRecipeModal";

export function useEditRecipeStore(): IEditRecipeModalStore {
  const [state, dispatch] = useReducer(editRecipeModalReducer, editRecipeModal);

  const closeModal = (): void => {
    dispatch({type: "CLOSE_MODAL"});
  };

  const openModal = (recipe: IInitialRecipeForm): void => {
    dispatch({type: "OPEN_MODAL", payload: recipe});
  };

  return {state, openModal, closeModal};
}

export function useEditRecipeContext(): IEditRecipeModalStore {
  const editRecipeContext = useContext(EditRecipeModalContext);

  if (!editRecipeContext)
    throw Error("EditRecipeContext context was used outside of provider");

  return editRecipeContext;
}