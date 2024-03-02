export interface IRecipeForm {
  title: string;
  typeId: string;
  image: File|null;
  description: string;
  steps: IIngredientStep[];
  ingredients: IIngredientStep[];
}

export interface IIngredientStep {
  value: string
  bold: boolean;
  italic: boolean;
  underlined: boolean;
}

export interface IInitialRecipeForm extends Omit<IRecipeForm, "image"> {
  _id: string;
  image: string;
}