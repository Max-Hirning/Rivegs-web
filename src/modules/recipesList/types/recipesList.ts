import {IRecipe} from "./recipe";

export interface IRecipesList {
  "data": IRecipe[];
  "page": null|number;
  "next": null|number;
  "previous": null|number;
  "totalPages": null|number;
}