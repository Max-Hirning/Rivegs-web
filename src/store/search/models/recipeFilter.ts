"use client";

import {createContext} from "react";
import {IRecipeFiltersStore} from "../types/recipeFilter";

export const RecipeFiltersContext = createContext<IRecipeFiltersStore|null>(null);