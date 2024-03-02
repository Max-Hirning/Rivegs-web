"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {userAPI} from "../controllers/api";
import {useSession} from "next-auth/react";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";

export function useUpdateSettings() {
  const {update, data: session} = useSession();

  return useMutation({
    mutationKey: [QueryKeys.updateSettings],
    mutationFn: (data: FormData) => userAPI.updateSettings(data, `${(session?.user as IUserSession)?.id}`, `${(session?.user as IUserSession)?.jwt}`),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
  });
}