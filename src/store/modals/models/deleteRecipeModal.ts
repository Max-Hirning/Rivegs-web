"use client";

import {createContext} from "react";
import {IDeleteRecipeModal, IDeleteRecipeModalStore} from "../types/deleteRecipeModal";

export const deleteRecipeModal: IDeleteRecipeModal = {
  id: null,
  modalStatus: false,
};
export const DeleteRecipeModalContext = createContext<IDeleteRecipeModalStore|null>(null);