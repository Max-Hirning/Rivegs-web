import {IUser} from "@/modules/settings";
import {IRecipeType} from "@/modules/sideBars";
import {IRecipeIngredientStep} from "@/modules/recipesList";

export interface IRecipe {
  _id: string;
  rate: number;
  title: string;
  image: string;
  type: IRecipeType;
  description: string;
  steps: IRecipeIngredientStep[];
  ingredients: IRecipeIngredientStep[];
  author: Omit<IUser, "savedRecipes"|"recipesIds">;
}