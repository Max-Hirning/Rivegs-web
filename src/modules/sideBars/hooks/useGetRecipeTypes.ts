"use client";

import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {recipeTypesAPI} from "../controllers/api";

export function useGetRecipeTypes() {
  return useQuery({
    queryKey: [QueryKeys.getRecipeTypes],
    queryFn: () => recipeTypesAPI.getAll(),
  });
}