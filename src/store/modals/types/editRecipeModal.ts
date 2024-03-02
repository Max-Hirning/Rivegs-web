import {IInitialRecipeForm} from "@/modules/recipeForm";

interface IActionOpenModal {
  type: "OPEN_MODAL";
  payload: IInitialRecipeForm;
}
interface IActionCloseModal {
  payload?: unknown;
  type: "CLOSE_MODAL";
}

export interface IEditRecipeModal {
  modalStatus: boolean;
  recipe: IInitialRecipeForm|null;
}
export interface IEditRecipeModalStore {
  closeModal: () => void;
  state: IEditRecipeModal;
  openModal: (recipe: IInitialRecipeForm) => void;
}
export type IAction = IActionOpenModal|IActionCloseModal;