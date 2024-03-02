"use client";

import {IResponse} from "@/types";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import {IForgotPassword} from "../types/forgotPassword";

export function useForgotPassword() {
  return useMutation({
    mutationKey: [QueryKeys.forgotPassword],
    mutationFn: (data: IForgotPassword): Promise<IResponse<undefined>> => authAPI.forgotPassword(data),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
    },
  });
}