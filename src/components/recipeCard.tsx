"use client";

import React from "react";
import Link from "next/link";
import {RateUI} from "@/UI/rateUI";
import {IUserSession} from "@/types";
import {AvatarUI} from "@/UI/avatarUI";
import {RecipeMenu} from "./recipeMenu";
import {useSession} from "next-auth/react";
import {IRecipe} from "@/modules/recipesList";
import ShareIcon from "@mui/icons-material/Share";
import {useSaveUnSaveRecipe} from "@/modules/settings";
import {IStatuses, ToastifyCaller} from "@/UI/alertUI";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import {Card, Stack, CardHeader, CardMedia, CardContent, CardActions, Button, IconButton, Typography} from "@mui/material";

interface IProps extends IRecipe {
  rate: number;
  title: string;
}

export function RecipeCard({_id, type, rate, author, steps, ingredients, image, title, description}: IProps) {
  const {data: session} = useSession();
  const saveUnSaveRecipe = useSaveUnSaveRecipe();

  const copyRecipeLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/recipe/${_id}`);
      ToastifyCaller(IStatuses.success, "Recipe url was copied");
    } catch (error) {
      ToastifyCaller(IStatuses.error, "Recipe url wasn't copied");
    }
  };

  return (
    <Card 
      elevation={3}
      className="max-md:max-w-[300px] md:max-w-[320px] max-h-[510px] h-fit w-full"
    >
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            maxWidth: "192px"
          }
        }}
        avatar={
          <AvatarUI
            size="normal"
            name={author?.login || ""}
            avatarUrl={author?.image || null}
          />
        }
        action={
          <RecipeMenu
            recipe={{
              _id,
              image,
              title,
              steps,
              ingredients,
              description,
              typeId: type._id,
            }}
          >
            <MoreVertIcon />
          </RecipeMenu>
        }
        title={title}
        subheader={author.login}
      />
      <div className="relative">
        <CardMedia
          alt={title}
          image={image}
          component="img"
          className="h-[290px]"
        />
        <RateUI 
          rate={rate.toString()}
          styles="absolute top-[10px] right-[10px]"
        />
      </div>
      <CardContent>
        <Typography 
          sx={{
            overflow: "hidden",
            WebkitLineClamp: "3",
            display: "-webkit-box",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
          }}
          variant="body2" 
          color="text.secondary"
          className="whitespace-normal"
        >{description}</Typography>
      </CardContent>
      <CardActions 
        disableSpacing
        className="flex justify-between"
      >
        <Stack
          direction="row"
          spacing={`${!session ? "0px" : "10px"}`}
        >
          <IconButton 
            className={`${!session && "hidden"}`}
            onClick={() => saveUnSaveRecipe.mutate(_id)}
          >
            {
              (((session?.user as IUserSession)?.savedRecipes || []).includes(_id)) ?
                <BookmarkRoundedIcon/> :
                <BookmarkBorderRoundedIcon/>
            }
          </IconButton>
          <IconButton onClick={copyRecipeLink}>
            <ShareIcon/>
          </IconButton>
        </Stack>
        <Link href={`/recipe/${_id}`}>
          <Button 
            variant="text"
            className="w-[105px]"
          >Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}