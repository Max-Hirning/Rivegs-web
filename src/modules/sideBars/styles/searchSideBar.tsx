"use client";

import React from "react";
import {styled} from "@mui/material/styles";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {AccordionSummaryProps} from "@mui/material/AccordionSummary";

export const Accordion = styled((props: AccordionProps) => (<MuiAccordion disableGutters elevation={0} square {...props} />))(() => ({
  "&:before": {
    display: "none",
  },
  "&:not(:last-child)": {
    borderBottom: 0,
  },
}));
export const AccordionSummary = styled((props: AccordionSummaryProps) => (<MuiAccordionSummary {...props} expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}} />} />))(() => ({
  border: "0px",

  "& .MuiAccordionSummary-expandIconWrapper": {
    rotate: "90deg",
  },
}));