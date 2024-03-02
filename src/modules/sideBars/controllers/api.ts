import {IResponse} from "@/types";
import axios, {AxiosError} from "axios";
import {IRecipeType} from "../types/recipeType";

class RecipeTypesAPI {
  constructor(protected readonly url: string) {}

  async getAll(): Promise<IResponse<IRecipeType[]>> {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
}

export const recipeTypesAPI = new RecipeTypesAPI(`${process.env.NEXT_PUBLIC_URL}/recipe-type`);