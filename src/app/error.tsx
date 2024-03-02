"use client";

import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button, Stack, Typography} from "@mui/material";

export default function Error() {
  const {back} = useRouter();

  return (
    <main className="w-screen h-screen bg-repeat bg-cover bg-[url('/images/auth.jpg')]">
      <section
        className="w-full h-full flex items-center justify-center flex-col p-10"
        style={{background: "linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgb(255, 255, 255, 0.6) 100%)"}}
      >
        <Typography 
          variant="h3"
          className="mb-4"
        >We lost that page...</Typography>
        <Typography 
          className="mb-3"
          variant="body1"
        >Something went wrong. Please contact our tech support or reload page</Typography>
        <Stack 
          spacing={5}
          direction="row"
        >
          <Button 
            variant="contained"
            onClick={() => back()}
          >Go back</Button>
          <Link href="/">
            <Button variant="contained">Return on main page</Button>
          </Link>
        </Stack>
      </section>
    </main>
  );
}