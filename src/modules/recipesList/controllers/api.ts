import {IResponse} from "@/types";
import axios, {AxiosError} from "axios";
import {IFilter} from "../types/filters";
import {IRecipesList} from "../types/recipesList";

class RecipesAPI {
  constructor(protected readonly url: string) {}

  async getAll({recipesIds, rate, ...filters}: Partial<IFilter>): Promise<IResponse<IRecipesList>> {
    try {
      const response = await axios.get(this.url, {
        params: {
          ...filters,
          rate: JSON.stringify(rate),
          recipesIds: JSON.stringify(recipesIds)
        }
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }
}

export const recipesAPI = new RecipesAPI(`${process.env.NEXT_PUBLIC_URL}/recipe`);