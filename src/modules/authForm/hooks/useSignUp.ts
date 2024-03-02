"use client";

import {IResponse} from "@/types";
import {ISignUp} from "../types/signUp";
import {useRouter} from "next/navigation";
import {authAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";

export function useSignUp() {
  const {push} = useRouter();

  return useMutation({
    mutationKey: [QueryKeys.signUp],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: ({confirmPassword, ...data}: ISignUp): Promise<IResponse<undefined>> => authAPI.signUp(data),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.success, success.message);
      push("/auth/sign-in");
    },
  });
}