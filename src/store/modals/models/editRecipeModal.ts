import {createContext} from "react";
import {IEditRecipeModal, IEditRecipeModalStore} from "../types/editRecipeModal";

export const editRecipeModal: IEditRecipeModal = {
  recipe: null,
  modalStatus: false,
};
export const EditRecipeModalContext = createContext<IEditRecipeModalStore|null>(null);