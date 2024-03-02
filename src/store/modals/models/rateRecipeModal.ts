import {createContext} from "react";
import {IRateRecipeModal, IRateRecipeModalStore} from "../types/rateRecipeModal";

export const rateRecipeModal: IRateRecipeModal = {
  rate: 3,
  modalStatus: false,
};
export const RateRecipeModalContext = createContext<IRateRecipeModalStore|null>(null);