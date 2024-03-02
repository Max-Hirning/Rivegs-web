import React from "react";
import {Skeleton} from "@mui/material";
import {RecipeCardSkeleton} from "@/components/recipeCardSkeleton";

export function RecipesListSkeleton() {
  return (
    <>
      <article className="flex justify-between items-end w-full mb-[25px]">
        <Skeleton variant="text" className="min-w-[200px] text-[45px]" />
        <Skeleton variant="text" className="min-w-[50px] mb-[10px] text-[15px]" />
      </article>
      <div className="gap-[24px] flex flex-wrap justify-center">
        <RecipeCardSkeleton/>
        <RecipeCardSkeleton/>
        <RecipeCardSkeleton/>
        <RecipeCardSkeleton/>
        <RecipeCardSkeleton/>
        <RecipeCardSkeleton/>
        <RecipeCardSkeleton/>
      </div>
    </>
  );
}
