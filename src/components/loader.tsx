"use client";

import React from "react";
import {QueryKeys} from "@/configs/queryKeys";
import {useIsMutating} from "@tanstack/react-query";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Loader() {
  const isSignIn = useIsMutating({mutationKey: [QueryKeys.signIn]});
  const isSignUp = useIsMutating({mutationKey: [QueryKeys.signUp]});
  const isResetPassword = useIsMutating({mutationKey: [QueryKeys.resetPassword]});
  const isForgotPassword = useIsMutating({mutationKey: [QueryKeys.forgotPassword]});

  const isCreateRecipe = useIsMutating({mutationKey: [QueryKeys.createRecipe]});
  const isUpdateRecipe = useIsMutating({mutationKey: [QueryKeys.updateRecipe]});
  const isUpdateRecipeRate = useIsMutating({mutationKey: [QueryKeys.updateRecipeRate]});

  const isDeleteUser = useIsMutating({mutationKey: [QueryKeys.deleteUser]});
  const isUpdateSecurity = useIsMutating({mutationKey: [QueryKeys.updateSecurity]});
  const isUpdateSettings = useIsMutating({mutationKey: [QueryKeys.updateSettings]});
  const isSaveUnSaveRecipe = useIsMutating({mutationKey: [QueryKeys.saveUnSaveRecipe]});

  return (
    <Backdrop
      sx={{zIndex: 10000000000, color: "#fff"}}
      open={!!(
        isSignIn||
        isSignUp||
        isResetPassword||
        isForgotPassword||

        isCreateRecipe||
        isUpdateRecipe||
        isUpdateRecipeRate||

        isDeleteUser||
        isUpdateSecurity||
        isUpdateSettings||
        isSaveUnSaveRecipe
      )}
    >
      <CircularProgress sx={{color: "white"}} />
    </Backdrop>
  );
}