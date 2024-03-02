import React from "react";
import {IUserSession} from "@/types";
import {IFilter} from "../types/filters";
import {RecipesList} from "./recipesList";
import {recipesAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/authOptions";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export const revalidate = 21600;

export async function FavoritesRecipesWrapper() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: Pick<IFilter, "recipesIds"> = {
    recipesIds: (session?.user as IUserSession).savedRecipes
  };

  await queryClient.prefetchQuery({
    queryFn: () => recipesAPI.getAll(filters),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getFavoviritesRecipes, JSON.stringify(filters)],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipesList 
        filters={{
          recipesIds: (session?.user as IUserSession).savedRecipes
        }}
        listTitle="My Favorites"
        queryRoute={QueryKeys.getFavoviritesRecipes}
      />
    </HydrationBoundary>
  );
}