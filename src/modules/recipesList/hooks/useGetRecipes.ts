"use client";

import {IFilter} from "../types/filters";
import {recipesAPI} from "../controllers/api";
import {useQuery} from "@tanstack/react-query";

export function useGetRecipes(queryRoute: string, filters: Partial<IFilter>) {
  return useQuery({
    queryFn: () => recipesAPI.getAll(filters),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryRoute, JSON.stringify(filters)],
  });
}