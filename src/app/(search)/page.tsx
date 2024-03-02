import React, {Suspense} from "react";
import {RecipesListSkeleton, SearchRecipesWrapper} from "@/modules/recipesList";

interface IProps {
  searchParams: { 
    page: string;
    type: string;
    rate: string;
    title: string;
    authorLogin: string;
  }
}

export default async function Home({searchParams}: IProps) {
  return (
    <Suspense fallback={<RecipesListSkeleton/>}>
      <SearchRecipesWrapper searchParams={searchParams}/>
    </Suspense>
  );
}
