import React from "react";
import {RecipeForm} from "./recipeForm";
import {QueryKeys} from "@/configs/queryKeys";
import {recipeTypesAPI} from "@/modules/sideBars";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export const cache = "force-cache";

export async function RecipeFormWrapper() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getRecipeTypes],
    queryFn: () => recipeTypesAPI.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeForm/>
    </HydrationBoundary>
  );
}