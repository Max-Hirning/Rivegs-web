import React from "react";
import {IFilter} from "../types/filters";
import {RecipesList} from "./recipesList";
import {recipesAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {ListPagination} from "./fistPagination";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

interface IProps {
  searchParams: { 
    page: string;
    type: string;
    rate: string;
    title: string;
    authorLogin: string;
  };
}

export async function SearchRecipesWrapper({searchParams}: IProps) {
  const queryClient = new QueryClient();
  const filters: Omit<IFilter, "recipesIds"> = {
    title: searchParams.title,
    typeId: searchParams.type,
    page: +(searchParams.page || 1),
    authorLogin: searchParams.authorLogin,
    rate: ((searchParams.rate?.split(",").length === 2) ? searchParams.rate?.split(",").map((el: string) => +el).slice(0, 2) || [1,5] : [1,5]) as [number, number],
  };

  await queryClient.prefetchQuery({
    queryFn: () => recipesAPI.getAll(filters),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getUsersRecipes, JSON.stringify(filters)],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipesList 
        filters={filters}
        listTitle="Recipes"
        queryRoute={QueryKeys.searchRecipes}
      />
      <ListPagination
        filters={filters}
        queryRoute={QueryKeys.searchRecipes}
      />
    </HydrationBoundary>
  );
}