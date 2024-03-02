"use client";

import React, {ReactNode} from "react";
import {useEditRecipeStore} from "../hooks/editRecipeModal";
import {EditRecipeModalContext} from "../models/editRecipeModal";

interface IProps {
  children: ReactNode;
}

export function EditRecipeModalProvider({children}: IProps) {
  const store = useEditRecipeStore();

  return (
    <EditRecipeModalContext.Provider value={store}>
      {children}
    </EditRecipeModalContext.Provider>
  );
}