import React from "react";
import type {Metadata} from "next";
import {Divider} from "@mui/material";
import {QueryKeys} from "@/configs/queryKeys";
import {Author, Card, Content, recipeAPI} from "@/modules/recipe";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

interface IProps { 
  params: { 
    recipeId: string; 
  }
}

export const revalidate = 21600;

export async function generateMetadata({params}: IProps): Promise<Metadata> {
  const recipe = await recipeAPI.getOne(params.recipeId);

  if(!recipe.data) throw new Error("Error in getting recipe");

  return {
    title: recipe.data.title,
    icons: recipe.data.image,
    description: recipe.data.description,
  };
}

export default async function Recipe({params}: IProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => recipeAPI.getOne(params.recipeId),
    queryKey: [QueryKeys.getRecipe, params.recipeId],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card/>
      <Divider className="opacity-0 my-[15px]"/>
      <Author/>
      <Divider className="opacity-0 my-[15px]"/>
      <Content/>
    </HydrationBoundary>
  );
}
