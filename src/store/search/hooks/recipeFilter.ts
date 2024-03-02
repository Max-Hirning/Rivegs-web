"use client";

import {useContext, useEffect, useReducer} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {RecipeFiltersContext} from "../models/recipeFilter";
import {recipeFilterReducer} from "../controllers/recipeFilter";
import {IRecipeFilters, IRecipeFiltersStore} from "../types/recipeFilter";

export function useRecipeFiltersContext(): IRecipeFiltersStore {
  const recipeFiltersContext = useContext(RecipeFiltersContext);

  if (!recipeFiltersContext)
    throw Error("RecipeFiltersContext context was used outside of provider");

  return recipeFiltersContext;
}

export function useRecipeFilterStore(recipeType: string): IRecipeFiltersStore {
  const {push} = useRouter();
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(recipeFilterReducer, {
    title: searchParams.get("title") || "",
    page: +(searchParams.get("page") || 1),
    type: searchParams.get("type") || recipeType,
    authorLogin: searchParams.get("authorLogin") || "",
    rate: searchParams.get("rate")?.split(",").map((el: string) => +el) || [1,5],
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(state).map((key: string) => {
      params.append(key, `${state[key]}`);
    });
    push(`?${params.toString()}`);
  }, [state]);

  const changePage = (page: number): void => {
    dispatch({type: "CHANGE_PAGE", payload: page});
  };

  const changeType = (type: string): void => {
    dispatch({type: "CHANGE_TYPE", payload: type});
  };

  const changeTitle = (title: string): void => {
    dispatch({type: "CHANGE_TITLE", payload: title});
  };

  const changeRate = (rate: number[]): void => {
    dispatch({type: "CHANGE_RATE", payload: rate});
  };

  const setFilters = (filters: IRecipeFilters): void => {
    dispatch({type: "SET_FILTERS", payload: filters});
  };

  const changeAuthorLogin = (authorLogin: string): void => {
    dispatch({type: "CHANGE_AUTHOR_LOGIN", payload: authorLogin});
  };

  return {state, changeTitle, changeAuthorLogin, setFilters, changePage, changeType, changeRate};
}