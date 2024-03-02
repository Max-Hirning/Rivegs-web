"use client";

import Link from "next/link";
import Image from "next/image";
import React, {ReactNode, useState} from "react";
import {IconButton, Drawer} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface IProps {
  children?: ReactNode;
}

export function Header({children}: IProps) {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <>
      <header className="z-[1000] items-center justify-between pr-[15px] bg-white border-b h-[100px] flex border-[#EAECF0] sticky left-0 top-0">
        <Link 
          href="/"
          className="block w-fit"
        >
          <Image
            width={100}
            height={100}
            alt="App logo"
            priority={true}
            src="/icons/logo.svg"
          />
        </Link>
        <IconButton 
          onClick={() => setMenu(true)}
          className={`${!children && "hidden"} lg:hidden h-fit w-fit`}
        >
          <MenuRoundedIcon className="text-[25px] text-[#494949]"/>
        </IconButton>
      </header>
      {
        (children) &&
        <Drawer 
          open={menu} 
          onClose={() => setMenu(false)}
        >{children}</Drawer>
      }
    </>
  );
}