"use client";

import Loader from "./loader";
import {IResponse} from "@/types";
import {ToastContainer} from "react-toastify";
import React, {ReactNode, useState} from "react";
import {SessionProvider, signOut} from "next-auth/react";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DeleteRecipeModalProvider, EditRecipeModalProvider, RateRecipeModalProvider} from "@/store/modals";

interface IProps {
  children: ReactNode;
}

export function ProviderComponent({children}: Readonly<IProps>) {
  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if((error as IResponse<undefined>)?.statusCode === 401) signOut();
      }
    }),
    mutationCache: new MutationCache({
      onError: (error: unknown) => {
        if((error as IResponse<undefined>)?.statusCode === 401) signOut();
      },
    })
  }));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RateRecipeModalProvider>
          <EditRecipeModalProvider>
            <DeleteRecipeModalProvider>
              <Loader/>
              <ToastContainer
                rtl={false}
                theme="light"
                draggable={true}
                autoClose={5000}
                pauseOnFocusLoss
                pauseOnHover={true}
                closeOnClick={true}
                newestOnTop={false}
                position="top-right"
                className="text-[15px]"
                hideProgressBar={false}
              />
              {children}
            </DeleteRecipeModalProvider>
          </EditRecipeModalProvider>
        </RateRecipeModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}