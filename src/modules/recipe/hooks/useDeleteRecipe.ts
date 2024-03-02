"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {recipeAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useDeleteRecipeContext} from "@/store/modals";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useDeleteRecipe(url?: string) {
  const {push} = useRouter();
  const {data} = useSession();
  const queryClient = useQueryClient();
  const deleteRecipeModal = useDeleteRecipeContext();

  return useMutation({
    mutationKey: [QueryKeys.deleteUser],
    mutationFn: (id: string) => recipeAPI.deleteRecipe(id, `${(data?.user as IUserSession)?.jwt}`),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (data: IResponse<undefined>) => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.getFavoviritesRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.getUsersRecipes]});
      queryClient.invalidateQueries({queryKey: [QueryKeys.searchRecipes]});
      ToastifyCaller(IStatuses.success, data.message);
      deleteRecipeModal.closeModal();
      if(url) push(url);
    },
  });
}