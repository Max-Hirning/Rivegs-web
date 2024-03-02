import React from "react";
import {IFilter} from "../types/filters";
import {RecipesList} from "./recipesList";
import {recipesAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

interface IProps {
  userLogin: string;
  recipesIds: string[];
}

export const revalidate = 21600;

export async function UsersRecipesWrapper({userLogin, recipesIds}: IProps) {
  const queryClient = new QueryClient();

  const filters: Pick<IFilter, "recipesIds"> = {
    recipesIds,
  };

  await queryClient.prefetchQuery({
    queryFn: () => recipesAPI.getAll(filters),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getUsersRecipes, JSON.stringify(filters)],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipesList 
        filters={{
          recipesIds,
        }}
        listTitle={`${userLogin} recipes`}
        queryRoute={QueryKeys.getUsersRecipes}
      />
    </HydrationBoundary>
  );
}