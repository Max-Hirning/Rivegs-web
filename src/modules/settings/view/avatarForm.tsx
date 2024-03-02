"use client";

import {AvatarUI} from "@/UI/avatarUI";
import {Button, Stack} from "@mui/material";
import React, {useState, ChangeEvent} from "react";

interface IProps {
  login: string|undefined;
  initialImg: string|undefined|null;
  saveImage: (image: File|null) => void;
}

export function AvatarForm({initialImg, saveImage, login}: IProps) {
  const [image, setImage] = useState<string|undefined|null>(() => initialImg);

  const deleteAvatar = (): void => {
    saveImage(null);
    setImage(initialImg);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setImage(URL.createObjectURL(selectedFile));
        saveImage(selectedFile);
      }
    }
  };

  return (
    <Stack
      spacing={4}
      direction="row"
      className="flex items-center relative"
    >
      <AvatarUI
        size="big"
        name={`${login}`}
        avatarUrl={image}
        styles="w-36 h-36 text-6xl"
      />
      <Stack
        spacing={1}
        direction="column"
      >
        <Button 
          component="label"
          variant="outlined"
        >
          Change photo
          <input
            style={{
              left: 0,
              width: 1,
              height: 1,
              bottom: 0,
              overflow: "hidden",
              position: "absolute",
              whiteSpace: "nowrap",
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
            }}
            type="file" 
            accept="image/*"
            onChange={handleImageChange} 
          />
        </Button>
        <Button 
          disabled={!image}
          variant="contained"
          onClick={deleteAvatar}
        >Delete</Button>
      </Stack>
    </Stack>
  );
}