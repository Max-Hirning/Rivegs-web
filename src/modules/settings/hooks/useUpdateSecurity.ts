"use client";

import {userAPI} from "../controllers/api";
import {useSession} from "next-auth/react";
import {ISecurity} from "../types/security";
import {QueryKeys} from "@/configs/queryKeys";
import {IResponse, IUserSession} from "@/types";
import {useMutation} from "@tanstack/react-query";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";

export function useUpdateSecurity() {
  const {update, data: session} = useSession();

  return useMutation({
    mutationKey: [QueryKeys.updateSecurity],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: ({confirmPassword, ...data}: ISecurity) => userAPI.updateSecurity(data, `${(session?.user as IUserSession)?.id}`, `${(session?.user as IUserSession)?.jwt}`),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      update();
    },
  });
}