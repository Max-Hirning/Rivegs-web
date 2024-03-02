"use client";

import React, {CSSProperties} from "react";
import {IIngredientStep} from "@/modules/recipeForm";
import {ListItem, IconButton, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IProps {
  value: string;
  deleteEl?: () => void;
  canBeDeleted?: boolean;
  elStyles: Pick<IIngredientStep, "bold"|"italic"|"underlined">;
}

export function RecipeSrepsIngredientsElUI({deleteEl, canBeDeleted, value, elStyles}: IProps) {
  const textStyles = (): object => {
    const styles: CSSProperties = {};
    if(elStyles.bold) styles.fontWeight = "bold";
    if(elStyles.italic) styles.fontStyle = "italic";
    if(elStyles.underlined) styles.textDecoration = "underline";
    return styles;
  };

  return (
    <ListItem className="bg-[#D9D9D9] rounded-xl my-3 flex items-center justify-between">
      <Typography 
        variant="subtitle2"
        className="w-[88%] whitespace-normal"
        sx={{...textStyles(), overflowWrap: "break-word !important"}}
      >{value}</Typography>
      {
        (canBeDeleted && deleteEl) &&
        <IconButton onClick={deleteEl}>
          <DeleteForeverIcon/>
        </IconButton>
      }
    </ListItem>
  );
}