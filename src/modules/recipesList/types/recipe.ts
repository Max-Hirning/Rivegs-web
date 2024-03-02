import {IUser} from "@/modules/settings";
import {IRecipeType} from "@/modules/sideBars";
import {IIngredientStep} from "@/modules/recipeForm";

export interface IRecipe {
  _id: string;
  rate: number;
  title: string;
  image: string;
  type: IRecipeType;
  description: string;
  steps: IRecipeIngredientStep[];
  ingredients: IRecipeIngredientStep[];
  author: Omit<IUser, "recipesIds"|"savedRecipes">;
}

export interface IRecipeIngredientStep extends IIngredientStep {
  _id: string;
}