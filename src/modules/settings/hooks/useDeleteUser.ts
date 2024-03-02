"use client";

import {IResponse} from "@/types";
import {IUserSession} from "@/types";
import {useRouter} from "next/navigation";
import {userAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useMutation} from "@tanstack/react-query";
import {signOut, useSession} from "next-auth/react";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";

export function useDeleteUser() {
  const {push} = useRouter();
  const {data} = useSession();

  return useMutation({
    mutationKey: [QueryKeys.deleteUser],
    mutationFn: () => userAPI.deleteUser(`${(data?.user as IUserSession)?.id}`, `${(data?.user as IUserSession)?.jwt}`),
    onError: (error: IResponse<undefined>) => {
      ToastifyCaller(IStatuses.error, error.message);
    },
    onSuccess: (success: IResponse<undefined>) => {
      signOut();
      push("/auth/sign-in");
      ToastifyCaller(IStatuses.success, success.message);
    },
  });
}