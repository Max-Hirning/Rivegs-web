import React, {FocusEvent, ReactNode} from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {Stack, FormControl, TextField, Typography, InputLabel} from "@mui/material";

interface IProps {
  id: string;
  label: string;
  value: string;
  error?: boolean;
  errorMsg?: string;
  required?: boolean;
  children: ReactNode;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  changeText: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function SelectUI({children, id, error, label, value, onBlur, required, errorMsg, changeText}: IProps) {
  return (
    <FormControl 
      className="w-full"
      component="fieldset"
    >
      <InputLabel
        htmlFor={id}
        error={required}
        required={required}
        style={{color: "black"}}
        className="top-[-18px] relative left-[-13px]"
      >
        {label}
      </InputLabel>
      <TextField
        select
        id={id}
        name={id}
        error={error}
        value={value}
        onBlur={onBlur}
        variant="outlined"
        required={required}
        onChange={changeText}
      >
        {children}
      </TextField>
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