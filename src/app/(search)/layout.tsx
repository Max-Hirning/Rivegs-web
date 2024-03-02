import {IUserSession} from "@/types";
import React, {ReactNode} from "react";
import {Header} from "@/components/header";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/authOptions";
import {recipeTypesAPI} from "@/modules/sideBars";
import {RecipeFilterProvider} from "@/store/search";
import {IRecipeType, SearchSideBar} from "@/modules/sideBars";

interface IProps {
  children: ReactNode;
}

export const revalidate = 21600;

export default async function RootLayout({children}: Readonly<IProps>) {
  const recipeTypes = await recipeTypesAPI.getAll();
  const session = await getServerSession(authOptions);

  return (
    <RecipeFilterProvider defaultRecipeType={(recipeTypes.data || [] as IRecipeType[])[0]._id}>
      <Header>
        <SearchSideBar 
          recipeTypes={recipeTypes.data || []}
          user={session?.user as IUserSession}
          styles="overflow-auto overflow-x-hidden"
        />
      </Header>
      <main className="flex h-full w-full">
        <SearchSideBar 
          recipeTypes={recipeTypes.data || []}
          user={session?.user as IUserSession}
          styles="max-lg:hidden z-50 bg-white fixed h-[calc(100%-100px)] overflow-auto overflow-x-hidden max-lg:hidden"
        />
        <section className="flex flex-col lg:w-[calc(100%-250px)] max-lg:w-full p-[24px] lg:ml-[250px] max-lg:items-center">{children}</section>
      </main>
    </RecipeFilterProvider>
  );
}
