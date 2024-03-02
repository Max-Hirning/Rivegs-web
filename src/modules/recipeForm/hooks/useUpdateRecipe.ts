"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {useSession} from "next-auth/react";
import {recipeAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useEditRecipeContext} from "@/store/modals";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useUpdateRecipe(recipeId: string|undefined) {
  const {data: session} = useSession();
  const queryClient = useQueryClient();
  const editRecipeModal = useEditRecipeContext();

  return useMutation({
    mutationKey: [QueryKeys.updateRecipe],
    mutationFn: (data: FormData): Promise<IResponse<undefined>> => recipeAPI.update(data, recipeId as string, (session?.user as IUserSession)?.jwt),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getFavoviritesRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUsersRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.searchRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getRecipe]});
      ToastifyCaller(IStatuses.success, success.message);
      editRecipeModal.closeModal();
    },
  });
}