import {IAction, IDeleteRecipeModal} from "../types/deleteRecipeModal";

export function deleteRecipeModalReducer(state: IDeleteRecipeModal, {type, payload}: IAction): IDeleteRecipeModal {
  switch (type) {
  case "OPEN_MODAL":
    return ({...state, modalStatus: true, id: payload});
  case "CLOSE_MODAL":
    return ({...state, modalStatus: false, id: null});
  default:
    return state;
  }
}