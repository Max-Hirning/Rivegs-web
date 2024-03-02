import {IRecipeFilters, IAction} from "../types/recipeFilter";

export function recipeFilterReducer(state: IRecipeFilters, {type, payload}: IAction): IRecipeFilters {
  switch (type) {
  case "CHANGE_PAGE":
    return ({...state, page: payload});
  case "CHANGE_TYPE":
    return ({...state, type: payload, page: 1});
  case "CHANGE_RATE":
    return ({...state, rate: payload, page: 1});
  case "CHANGE_TITLE":
    return ({...state, title: payload, page: 1});
  case "CHANGE_AUTHOR_LOGIN":
    return ({...state, authorLogin: payload, page: 1});
  default:
    return state;
  }
}