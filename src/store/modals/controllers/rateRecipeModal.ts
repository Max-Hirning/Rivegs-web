import {IRateRecipeModal, IAction} from "../types/rateRecipeModal";

export function rateRecipeModalReducer(state: IRateRecipeModal, {type, payload}: IAction): IRateRecipeModal {
  switch (type) {
  case "OPEN_MODAL":
    return ({...state, modalStatus: true, rate: payload});
  case "UPDATE_RATE":
    return ({...state, rate: payload});
  case "CLOSE_MODAL":
    return ({...state, modalStatus: false, rate: 3});
  default:
    return state;
  }
}