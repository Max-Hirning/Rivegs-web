"use client";

import {IResponse} from "@/types";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";
import {useRouter, useParams} from "next/navigation";
import {IResetPassword} from "../types/resetPassword";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";

export function useResetPassword() {
  const {push} = useRouter();
  const {code} = useParams();

  return useMutation({
    mutationKey: [QueryKeys.resetPassword],
    mutationFn: ({password}: IResetPassword): Promise<IResponse<undefined>> => authAPI.resetPassword({password}, code as string),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      push("/auth/sign-in");
    },
  });
}