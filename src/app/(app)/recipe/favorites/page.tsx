import type {Metadata} from "next";
import React, {Suspense} from "react";
import {FavoritesRecipesWrapper, RecipesListSkeleton} from "@/modules/recipesList";

export const metadata: Metadata = {
  title: "Favorites recipes",
  description: "My favorites recipes",
};

export default function Favorites() {
  return (
    <>
      <Suspense fallback={<RecipesListSkeleton/>}>
        <FavoritesRecipesWrapper/>
      </Suspense>
    </>
  );
}
