"use client";

import React from "react";
import {Pagination} from "@mui/material";
import {IFilter} from "../types/filters";
import {useGetRecipes} from "../hooks/useGetRecipes";
import {useRecipeFiltersContext} from "@/store/search";

interface IProps {
  queryRoute: string;
  filters: Partial<IFilter>;
}

export function ListPagination({queryRoute, filters}: IProps) {
  const {state, changePage} = useRecipeFiltersContext();
  const {data, isLoading, isError} = useGetRecipes(queryRoute, filters);

  return (
    <Pagination 
      shape="rounded" 
      page={state.page}
      variant="outlined" 
      disabled={isLoading}
      count={data?.data?.totalPages || 0} 
      onChange={(_, page) => changePage(page)}
      className={`justify-center mt-4 items-center mb-5 ${((data?.data?.page !== null && data?.data?.page !== 0) && !(isError || isLoading)) ? "flex" : "hidden"}`}
    />
  );
}