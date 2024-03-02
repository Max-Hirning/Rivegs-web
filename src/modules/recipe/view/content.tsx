"use client";

import {Tabs, Tab} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useGetRecipe} from "../hooks/useGetRecipe";
import React, {useState, SyntheticEvent, ReactNode} from "react";
import {IRecipeIngredientStep} from "@/modules/recipesList/types/recipe";
import {RecipeSrepsIngredientsElUI} from "@/UI/recipeStepsIngredientsElUI";

interface TabPanelProps {
  index: number;
  value: number;
  children?: ReactNode;
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      {...other}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function Content() {
  const theme = useTheme();
  const {data} = useGetRecipe();
  const [value, setValue] = useState(0);

  if(!data?.data) throw new Error("Error in getting recipe");

  const handleChange = (_: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <section className="w-full max-w-[760px] m-auto">
      <Tabs 
        sx={{
          "& .MuiTab-root": {
            zIndex: "10",
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
          },
          "& .Mui-selected": {
            color: "white !important",
          },
          "& .MuiTabs-indicator": {
            height: "100%",
            borderRadius: "4px",
            backgroundColor: theme.palette.primary.main,
          }
        }}
        value={value}
        textColor="inherit"
        variant="fullWidth"
        onChange={handleChange}
        indicatorColor="secondary"
        className="max-w-[375px] m-auto"
      >
        <Tab label="Steps" {...a11yProps(0)} />
        <Tab label="Ingredients" {...a11yProps(1)} className="ml-[50px]"/>
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <>
          {
            (data.data.steps || []).map(({value, _id, ...styles}: IRecipeIngredientStep) => {
              return (
                <RecipeSrepsIngredientsElUI
                  key={_id}
                  value={value}
                  elStyles={styles}
                />
              );
            })
          }
        </>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <>
          {
            (data.data.ingredients || []).map(({value, _id, ...styles}: IRecipeIngredientStep) => {
              return (
                <RecipeSrepsIngredientsElUI
                  key={_id}
                  value={value}
                  elStyles={styles}
                />
              );
            })
          }
        </>
      </CustomTabPanel>
    </section>
  );
}