import {array, boolean, object, string} from "yup";

export const recipeFormSchema = object({
  steps: array().of(
    object({
      bold: boolean().required("Bold is required"),
      italic: boolean().required("Italic is required"),
      value: string().required("Step value is required"),
      underlined: boolean().required("Underlined is required"),
    })
  ).required("Steps are required"),
  ingredients: array().of(
    object({
      bold: boolean().required("Bold is required"),
      italic: boolean().required("Italic is required"),
      value: string().required("Step value is required"),
      underlined: boolean().required("Underlined is required"),
    })
  ).required("Ingredients are required"),
  description: string().notRequired().max(400),
  typeId: string().required("Type id is required"),
  title: string().required("Title is required").max(100),
});