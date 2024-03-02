"use client";

import {InputUI} from "@/UI/inputUI";
import {IUserSession} from "@/types";
import {IRecipeType} from "../types/recipeType";
import {useRecipeFiltersContext} from "@/store/search";
import React, {ReactElement, ChangeEvent} from "react";
import {SearchSideBarHeader} from "./searchSideBarHeader";
import {Accordion, AccordionSummary} from "../styles/searchSideBar";
import {Divider, Box, Slider, AccordionDetails, RadioGroup, FormControlLabel, Radio, Typography} from "@mui/material";

interface IProps {
  styles?: string;
  recipeTypes: IRecipeType[];
  user: IUserSession|undefined|null;
}

export function SearchSideBar({recipeTypes, user, styles}: IProps) {
  const {state, changeAuthorLogin, changeTitle, changeRate, changeType} = useRecipeFiltersContext();

  return (
    <aside className={`w-[250px] border-r border-[#EAECF0] ${styles || ""}`}>
      <SearchSideBarHeader user={user}/>
      <Box className="px-4 py-3">
        <InputUI
          type="text"
          id="recipe title"
          value={state.title}
          placeholder="Recipe title"
          changeText={(e) => changeTitle(e.target.value)}
        />
      </Box>
      <Divider className="w-full" />
      <Accordion>
        <AccordionSummary>
          <Typography variant="subtitle1">Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup onChange={(e: ChangeEvent<HTMLInputElement>) => changeType(e.target.value)}>
            {
              recipeTypes.map(({_id, title}: IRecipeType): ReactElement => {
                return (
                  <FormControlLabel 
                    key={_id}
                    value={_id}
                    checked={_id === state.type}
                    control={<Radio size="small" />} 
                    label={<Typography variant="subtitle1">{title}</Typography>} 
                  />
                );
              })
            }
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Divider className="w-full" />
      <Accordion >
        <AccordionSummary>
          <Typography variant="subtitle1">Rate</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            max={5}
            min={1}
            size="small"
            value={state.rate}
            defaultValue={[3, 4]}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Small"}
            onChange={(_, newValue) => changeRate(newValue as number[])}
          />
        </AccordionDetails>
      </Accordion>
      <Divider className="w-full" />
      <Accordion >
        <AccordionSummary>
          <Typography variant="subtitle1">Author login</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InputUI
            type="text"
            id="author login"
            value={state.authorLogin}
            placeholder="Author login"
            changeText={(e) => changeAuthorLogin(e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
    </aside>
  );
}