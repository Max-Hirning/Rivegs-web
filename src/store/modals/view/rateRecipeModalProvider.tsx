"use client";

import React, {ReactNode} from "react";
import {useRateRecipeStore} from "../hooks/rateRecipeModal";
import {RateRecipeModalContext} from "../models/rateRecipeModal";

interface IProps {
  children: ReactNode;
}

export function RateRecipeModalProvider({children}: IProps) {
  const store = useRateRecipeStore();

  return (
    <RateRecipeModalContext.Provider value={store}>
      {children}
    </RateRecipeModalContext.Provider>
  );
}