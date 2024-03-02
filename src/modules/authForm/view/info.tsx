import React from "react";
import {Typography} from "@mui/material";

interface IProps {
  title: string;
  subTitle: string;
}

export function Info({title, subTitle}: IProps) {
  return (
    <article className="mb-6">
      <Typography 
        variant="h1" 
        className="mb-2 whitespace-normal"      
      >{title}</Typography>
      <Typography 
        variant="subtitle2"
        className="whitespace-normal"
      >{subTitle}</Typography>
    </article>
  );
}