import React from "react";
import {Skeleton, Stack, Card} from "@mui/material";

export function RecipeCardSkeleton() {
  return (
    <Card 
      elevation={3}
      className="max-w-[320px] max-h-[510px] h-fit w-full"
    >
      <div className="items-center flex p-[16px] items-center">
        <Skeleton className="mr-[16px]" variant="circular" width={48} height={48} />
        <article className="flex-auto">
          <Skeleton variant="text" className="text-[12px]" />
          <Skeleton variant="text" className="text-[12px]" />
        </article>
        <Skeleton className="ml-[16px]" variant="circular" width={24} height={24} />
      </div>
      <Skeleton variant="rectangular" height={290} />
      <article className="p-[16px]">
        <Skeleton variant="rounded" className="h-[43.2px]" />
      </article>
      <div className="items-center flex justify-between p-[8px]">
        <Stack
          spacing="26px"
          direction="row"
        >
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Stack>
        <Skeleton variant="rounded" className="w-[105px] h-[48px]" />
      </div>
    </Card>
  );
}