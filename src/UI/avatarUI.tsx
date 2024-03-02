import React from "react";
import Image from "next/image";
import {Avatar} from "@mui/material";

interface IProps {
  name: string;
  styles?: string;
  size: "big"|"normal";
  widthBorder?: boolean;
  avatarUrl?: string|null;
}

export function AvatarUI({size, name, styles, avatarUrl, widthBorder}: IProps) {
  const sizeStyles = () => {
    switch(size) {
    case "big":
      return `${widthBorder ? "w-[100px] h-[100px]" : "w-24 h-24"}`;
    case "normal": 
      return `${widthBorder ? "w-[52px] h-[52px]" : "w-12 h-12"}`;
    default:
      throw Error("Please paste size prop");
    }
  };

  const borderStyles = () => {
    if(widthBorder) {
      return {
        border: "4px solid white"
      };
    }

    return {};
  };

  if(avatarUrl || (avatarUrl && avatarUrl?.length > 0)) {
    return (
      <Image
        alt={name}
        fill={true}
        sizes="100%"
        loading="eager"
        src={avatarUrl}
        style={{...borderStyles()}}
        className={`${sizeStyles()} rounded-full relative ${styles}`}
      />
    );
  }

  return (
    <Avatar 
      style={{...borderStyles()}}
      className={`${sizeStyles()} ${styles}`}
    >{name[0]?.toUpperCase()}</Avatar>
  );
}