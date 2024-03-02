"use client";

import React from "react";
import {useRateRecipeContext} from "@/store/modals";
import {Typography, Rating, Button} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {useUpdateRecipeRate} from "../hooks/useUpdateRecipeRate";

export function RateModal() {
  const {mutate} = useUpdateRecipeRate();
  const rateRecipeModal = useRateRecipeContext();

  const changeRate = () => {
    mutate(rateRecipeModal.state.rate);
    rateRecipeModal.closeModal();
  };

  return (
    <>
      <Typography 
        gutterBottom
        variant="body1"
        className="mt-[35px] text-[25px]"
      >Rate recipe</Typography>
      <Rating
        className="mb-[10px]"
        onChange={(_, newValue) => {
          (newValue) && rateRecipeModal.updateRate(newValue);
        }}
        value={rateRecipeModal.state.rate}
        emptyIcon={<StarBorderIcon sx={{color: "#faaf00"}}/>}
      />
      <Button 
        variant="contained"
        onClick={changeRate}
        className="w-28 h-[35px]"
      >Save</Button>
    </>
  );
}