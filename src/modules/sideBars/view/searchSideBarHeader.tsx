"use client";

import React from "react";
import Link from "next/link";
import {IUserSession} from "@/types";
import {AvatarUI} from "@/UI/avatarUI";
import {useSession} from "next-auth/react";
import {Button, Typography, Stack, Box} from "@mui/material";

interface IProps {
  user: IUserSession|null|undefined;
}

export function SearchSideBarHeader({user}: IProps) {
  const {data: session} = useSession();

  if(session?.user || user) {
    return (
      <Stack
        spacing={2}
        direction="row"
        className="px-5 py-7 pb-5 relative"
      >
        <Link href="/profile/settings">
          <AvatarUI
            size="normal"
            avatarUrl={(session?.user) ? session?.user.image : user?.image}
            name={(session?.user) ? `${(session?.user as IUserSession).login}` : `${user?.login}`}
          />
        </Link>
        <Stack 
          direction="column"
          className="justify-center"
        >
          <Typography 
            gutterBottom
            variant="body1"
          >Welcome</Typography>
          <Typography 
            variant="body2"
            className="whitespace-nowrap overflow-hidden text-ellipsis w-[104px]"
          >{(session?.user) ? `${(session?.user as IUserSession).login}` : `${user?.login}`}</Typography>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Box className="px-5 py-7 pb-5 relative flex">
        <Link 
          className="m-auto"
          href="/auth/sign-in"
        >
          <Button variant="contained">Sign in</Button>
        </Link>
      </Box>
    );
  }
}