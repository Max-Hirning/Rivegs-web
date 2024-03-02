"use client";

import React, {ReactNode} from "react";
import {useRecipeFilterStore} from "../hooks/recipeFilter";
import {RecipeFiltersContext} from "../models/recipeFilter";

interface IProps {
  children: ReactNode;
  defaultRecipeType: string;
}

export function RecipeFilterProvider({children, defaultRecipeType}: IProps) {
  const recipeFiltersStore = useRecipeFilterStore(defaultRecipeType);

  return (
    <RecipeFiltersContext.Provider value={recipeFiltersStore}>
      {children}
    </RecipeFiltersContext.Provider>
  );
}