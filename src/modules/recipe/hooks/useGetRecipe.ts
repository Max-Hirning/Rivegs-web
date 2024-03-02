"use client";

import {useParams} from "next/navigation";
import {recipeAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";

export function useGetRecipe() {
  const {recipeId} = useParams();

  return useQuery({
    queryKey: [QueryKeys.getRecipe, recipeId],
    queryFn: () => recipeAPI.getOne(recipeId as string),
  });
}