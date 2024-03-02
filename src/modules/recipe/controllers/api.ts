import {IResponse} from "@/types";
import {IRecipe} from "../types/recipe";
import axios, {AxiosError} from "axios";

class RecipeAPI {
  constructor(protected readonly url: string) {}

  async getOne(recipeId: string): Promise<IResponse<IRecipe>> {
    try {
      const response = await axios.get(`${this.url}/${recipeId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async deleteRecipe(recipeId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.delete(`${this.url}/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async changeRecipeRate(rate: number, recipeId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.put(`${this.url}/rate/${recipeId}`, {rate}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  } 
}

export const recipeAPI = new RecipeAPI(`${process.env.NEXT_PUBLIC_URL}/recipe`);