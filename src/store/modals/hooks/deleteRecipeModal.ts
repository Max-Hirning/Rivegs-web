"use client";

import {useContext, useReducer} from "react";
import {IDeleteRecipeModalStore} from "../types/deleteRecipeModal";
import {deleteRecipeModalReducer} from "../controllers/deleteRecipeModal";
import {DeleteRecipeModalContext, deleteRecipeModal} from "../models/deleteRecipeModal";

export function useDeleteRecipeStore(): IDeleteRecipeModalStore {
  const [state, dispatch] = useReducer(deleteRecipeModalReducer, deleteRecipeModal);

  const closeModal = (): void => {
    dispatch({type: "CLOSE_MODAL"});
  };

  const openModal = (id: string): void => {
    dispatch({type: "OPEN_MODAL", payload: id});
  };

  return {state, openModal, closeModal};
}

export function useDeleteRecipeContext(): IDeleteRecipeModalStore {
  const deleteRecipeContext = useContext(DeleteRecipeModalContext);

  if (!deleteRecipeContext)
    throw Error("DeleteRecipeContext context was used outside of provider");

  return deleteRecipeContext;
}