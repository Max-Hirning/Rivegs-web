"use client";

import Image from "next/image";
import {useTheme} from "@mui/system";
import {Button} from "@mui/material";
import React, {ChangeEvent} from "react";
import {Theme} from "@mui/material/styles";
import {isImgHorisontal} from "../controllers/img";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface IProps {
  saveImage: (image: File) => void;
  image: string|undefined|null|File;
}

export function RecipeImage({image, saveImage}: IProps) {
  const theme = useTheme<Theme>();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        isImgHorisontal(selectedFile, () => {
          saveImage(selectedFile);
        });
      }
    }
  };

  return (
    <Button 
      sx={{
        padding: "0px",
        height: "15rem",
        marginBottom: "1rem",
        backgroundColor: "transparent !important",
        border: `3px dashed ${theme.palette.primary.main}`,
        "&:hover": {
          backgroundColor: "transparent !important",
        },
        "&:active": {
          backgroundColor: "transparent !important",
        },
      }}
      variant="contained"
    >
      <label className="w-full h-full items-center flex justify-center relative">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {
          image 
            ? 
            <Image
              fill={true}
              alt="Selected"
              className="object-cover w-full h-full"
              src={(typeof image === "string") ? image : URL.createObjectURL(image)}
            />
            : 
            <AddRoundedIcon sx={{color: theme.palette.primary.main}} />
        }
      </label>
    </Button>
  );
}