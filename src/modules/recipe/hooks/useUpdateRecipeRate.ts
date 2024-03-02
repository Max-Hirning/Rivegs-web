"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {recipeAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateRecipeRate() {
  const {data} = useSession();
  const {recipeId} = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.updateRecipeRate],
    mutationFn: (newRate: number) => recipeAPI.changeRecipeRate(newRate, `${recipeId}`, `${(data?.user as IUserSession)?.jwt}`),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (data: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getFavoviritesRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUsersRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.searchRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getRecipe]});
      ToastifyCaller(IStatuses.success, data.message);
    },
  });
}