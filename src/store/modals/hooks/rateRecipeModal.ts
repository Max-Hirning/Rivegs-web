"use client";

import {useContext, useReducer} from "react";
import {IRateRecipeModalStore} from "../types/rateRecipeModal";
import {rateRecipeModalReducer} from "../controllers/rateRecipeModal";
import {RateRecipeModalContext, rateRecipeModal} from "../models/rateRecipeModal";

export function useRateRecipeStore(): IRateRecipeModalStore {
  const [state, dispatch] = useReducer(rateRecipeModalReducer, rateRecipeModal);

  const closeModal = (): void => {
    dispatch({type: "CLOSE_MODAL"});
  };

  const openModal = (rate: number): void => {
    dispatch({type: "OPEN_MODAL", payload: rate});
  };

  const updateRate = (rate: number): void => {
    dispatch({type: "UPDATE_RATE", payload: rate});
  };

  return {state, updateRate, openModal, closeModal};
}

export function useRateRecipeContext(): IRateRecipeModalStore {
  const rateRecipeContext = useContext(RateRecipeModalContext);

  if (!rateRecipeContext)
    throw Error("RateRecipeContext context was used outside of provider");

  return rateRecipeContext;
}