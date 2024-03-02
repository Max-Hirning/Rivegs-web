import {IEditRecipeModal, IAction} from "../types/editRecipeModal";

export function editRecipeModalReducer(state: IEditRecipeModal, {type, payload}: IAction): IEditRecipeModal {
  switch (type) {
  case "OPEN_MODAL":
    return ({...state, modalStatus: true, recipe: payload});
  case "CLOSE_MODAL":
    return ({...state, modalStatus: false, recipe: null});
  default:
    return state;
  }
}