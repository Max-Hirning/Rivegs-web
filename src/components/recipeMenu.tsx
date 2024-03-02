"use client";

import Link from "next/link";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";
import React, {ReactNode, useState} from "react";
import {IInitialRecipeForm} from "@/modules/recipeForm";
import {Menu, Divider, MenuItem, IconButton} from "@mui/material";
import {useDeleteRecipeContext, useEditRecipeContext} from "@/store/modals";

interface IProps {
  styleBtn?: string;
  children: ReactNode;
  recipe: IInitialRecipeForm;
}

export function RecipeMenu({styleBtn, children, recipe}: IProps) {
  const pathname = usePathname();
  const {data: session} = useSession();
  const editRecipeModal = useEditRecipeContext();
  const deleteRecipeModal = useDeleteRecipeContext();
  const isMenuOnRecipePage = pathname === `/recipe/${recipe._id}`;
  const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const deleteRequest = (): void => {
    deleteRecipeModal.openModal(recipe._id);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton 
        onClick={handleClick}
        className={`${styleBtn || ""} ${!session && "hidden"}`}
      >
        {children}
      </IconButton>
      <Menu
        sx={{
          "& .MuiMenu-list": {
            padding: "0px"
          },
          "& .MuiMenu-paper": {
            width: "112px",
            padding: "10px",
            borderRadius: "8px",
          },
          "& .MuiMenuItem-root": {
            paddingBlock: "8px"
          }
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Link 
          href={`/recipe/${recipe._id}`}
          aria-disabled={isMenuOnRecipePage}
          tabIndex={isMenuOnRecipePage ? -1 : undefined}
          className={`${isMenuOnRecipePage && "pointer-events-none"}`}
        >
          <MenuItem 
            onClick={handleClose}
            disabled={isMenuOnRecipePage}
          >View</MenuItem>
        </Link>
        <Divider className="my-[0px]"/>
        <MenuItem onClick={() => {
          handleClose();
          editRecipeModal.openModal(recipe);
        }}>Edit</MenuItem>
        <Divider className="my-[0px]"/>
        <MenuItem onClick={deleteRequest}>Delete</MenuItem>
      </Menu>
    </>
  );
}