"use client";

import {InputUI} from "@/UI/inputUI";
import React, {useState, ReactElement} from "react";
import {IIngredientStep} from "../types/recipeForm";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import {RecipeSrepsIngredientsElUI} from "@/UI/recipeStepsIngredientsElUI";
import {Box, Button, List, ToggleButton, ToggleButtonGroup} from "@mui/material";

interface IProps {
  id: string;
  label: string;
  btnTitle: string;
  required?: boolean;
  multiline?: boolean;
  placeholder: string;
  data: IIngredientStep[];
  handleChange: (data: IIngredientStep[]) => void;
}

export function StepsIngredientsForm({handleChange, multiline, btnTitle, data, id, label, required, placeholder}: IProps) {
  const [value, setValue] = useState<string>("");
  const [formats, setFormats] = useState<Array<"bold"|"italic"|"underlined">>([]);

  const addEl = (): void => {
    data.push({
      value,
      bold: Boolean(formats.find((el: string) => el === "bold")),
      italic: Boolean(formats.find((el: string) => el === "italic")),
      underlined: Boolean(formats.find((el: string) => el === "underlined")),
    });
    handleChange(data);
    setValue("");
    setFormats([]);
  };

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: Array<"bold"|"italic"|"underlined">) => {
    setFormats(newFormats);
  };

  return (
    <>
      <Box>
        <InputUI
          id={id}
          type="text"
          label={label}
          value={value}
          required={required}
          multiline={multiline}
          placeholder={placeholder}
          changeText={(e) => setValue(e.target.value)}
        />
        <Box className="flex w-full my-3 justify-between items-center">
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton 
              value="bold" 
              aria-label="bold"
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton 
              value="italic" 
              aria-label="italic"
            >
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton 
              value="underlined" 
              aria-label="underlined"
            >
              <FormatUnderlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button 
            type="button"
            onClick={addEl}
            variant="contained"
            disabled={value.length === 0}
          >{btnTitle}</Button>
        </Box>
      </Box>
      <List className="w-full">
        {
          data.map(({value, ...styles}: IIngredientStep, index: number): ReactElement => {
            return (
              <RecipeSrepsIngredientsElUI
                key={index}
                value={value}
                elStyles={styles}
                canBeDeleted={true}
                deleteEl={() => {
                  data.splice(index, 1);
                  handleChange(data);
                }}
              />
            );
          })
        }
      </List>
    </>
  );
}