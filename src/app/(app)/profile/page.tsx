import type {Metadata} from "next";
import {IUserSession} from "@/types";
import React, {Suspense} from "react";
import {AvatarUI} from "@/UI/avatarUI";
import {userAPI} from "@/modules/settings";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/configs/authOptions";
import {Box, Stack, Typography} from "@mui/material";
import {RecipesListSkeleton, UsersRecipesWrapper} from "@/modules/recipesList";

export const metadata: Metadata = {
  title: "Profile",
  description: "My profile",
};

export const revalidate = 21600;

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = await userAPI.getUser((session?.user as IUserSession).id);

  if(!user.data) throw new Error("Error in getting user");

  return (
    <>
      <section>
        <div className="w-full bg-no-repeat bg-cover h-[250px] bg-[url('/images/profile.jpg')] mb-4"></div>
        <Stack
          spacing={1}
          direction="row"
          className="mx-5 items-center max-lg:px-5 relative mt-[-32.5px]"
        >
          <AvatarUI
            size="big"
            widthBorder={true}
            name={user.data.login}
            avatarUrl={user.data.image}
          />
          <Box>
            <Typography 
              gutterBottom
              variant="body1"
            >{user.data.login}</Typography>
            <Typography variant="subtitle2">{user.data.description}</Typography>
          </Box>
        </Stack>
      </section>
      <section className="gap-[24px] flex flex-wrap justify-center mt-[50px]">
        <Suspense fallback={<RecipesListSkeleton/>}>
          <UsersRecipesWrapper
            userLogin={user.data.login}
            recipesIds={user.data.recipesIds}
          />
        </Suspense>
      </section>
    </>
  );
}

