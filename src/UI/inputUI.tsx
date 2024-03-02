"use client";

import React, {FocusEvent} from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {FormControl, TextField, InputLabel, Stack, Typography} from "@mui/material";

interface IProps {
  id: string;
  label?: string;
  value: string;
  error?: boolean;
  errorMsg?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  type: "text"|"password"|"number"|"email"|"date"|"time"|"search"|"tel";
  onBlur?: (e: FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  changeText: (e: FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
}

export function InputUI({multiline, id, type, error, label, value, onBlur, required, errorMsg, changeText, placeholder = ""}: IProps) {
  return (
    <FormControl 
      className="w-full"
      component="fieldset"
    >
      {
        (label) &&
        <InputLabel
          htmlFor={id}
          error={required}
          required={required}
          style={{color: "black"}}
          className="top-[-18px] relative left-[-13px]"
        >
          {label}
        </InputLabel>
      }
      <TextField
        id={id}
        name={id}
        type={type}
        error={error}
        value={value}
        onBlur={onBlur}
        variant="outlined"
        required={required}
        multiline={multiline}
        onChange={changeText}
        placeholder={placeholder}
      />
      {error && (
        <Stack  
          spacing={0.5}  
          direction="row"  
          className="mt-1"
        >
          <WarningAmberRoundedIcon 
            color="error" 
            fontSize="small" 
          />
          <Typography
            color="error"
            display="block"
            variant="caption"
            className="mt-px"
          >
            {errorMsg || "Error message"}
          </Typography>
        </Stack>
      )}
    </FormControl>
  );
}