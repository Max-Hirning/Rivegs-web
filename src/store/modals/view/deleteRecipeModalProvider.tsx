"use client";

import React, {ReactNode} from "react";
import {useDeleteRecipeStore} from "../hooks/deleteRecipeModal";
import {DeleteRecipeModalContext} from "../models/deleteRecipeModal";

interface IProps {
  children: ReactNode;
}

export function DeleteRecipeModalProvider({children}: IProps) {
  const store = useDeleteRecipeStore();

  return (
    <DeleteRecipeModalContext.Provider value={store}>
      {children}
    </DeleteRecipeModalContext.Provider>
  );
}