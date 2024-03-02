import React from "react";
import {Chip} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

interface IProps {
  rate: string;
  styles?: string;
}

export function RateUI({rate, styles}: IProps) {
  return (
    <Chip
      label={rate}
      className={`bg-[#FFE1B3] ${styles || ""}`}
      icon={<StarRoundedIcon className="text-[#FFAD30]"/>}
    />
  );
}