"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {userAPI} from "../controllers/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useSaveUnSaveRecipe() {
  const {update, data} = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.saveUnSaveRecipe],
    mutationFn: (recipeId: string) => userAPI.saveUnSaveRecipe(`${(data?.user as IUserSession)?.id}`, recipeId, `${(data?.user as IUserSession)?.jwt}`),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getFavoviritesRecipes]});
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
  });
}