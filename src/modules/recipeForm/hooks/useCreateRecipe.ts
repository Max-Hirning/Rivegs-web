"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {useSession} from "next-auth/react";
import {recipeAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const {data: session, update} = useSession();

  return useMutation({
    mutationKey: [QueryKeys.createRecipe],
    mutationFn: (data: FormData): Promise<IResponse<undefined>> => {
      data.append("authorId", (session?.user as IUserSession)?.id);
      return recipeAPI.create(data, (session?.user as IUserSession)?.jwt);
    },
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUsersRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.searchRecipes]});
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
  });
}