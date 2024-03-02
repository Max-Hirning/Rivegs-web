"use client";

import React from "react";
import Link from "next/link";
import {AvatarUI} from "@/UI/avatarUI";
import {useGetRecipe} from "../hooks/useGetRecipe";
import {Typography, Stack, Button} from "@mui/material";

export function Author() {
  const {data} = useGetRecipe();

  if(!data?.data) throw new Error("Error in getting recipe");

  return (
    <Stack
      spacing="20px"
      direction="row"
      component="section"
      className="w-full justify-between items-center"
    >
      <Stack
        spacing="10px"
        direction="row"
      >
        <AvatarUI
          size="normal"
          name={data.data.author.login}
          avatarUrl={data.data.author.image}
        />
        <article className="justify-center flex flex-col">
          <Typography>{data.data.author.login}</Typography>
          {(data.data.author.description) && <Typography className="mt-[10px]">{data.data.author.description}</Typography>}
        </article>
      </Stack>
      <Link href={`/profile/${data.data.author._id}`}>
        <Button 
          variant="contained"
          className="w-20 h-[35px]"
        >Visit</Button>
      </Link>
    </Stack>
  );
}