import {IResponse} from "@/types";
import axios, {AxiosError} from "axios";

class RecipeAPI {
  constructor(protected readonly url: string) {}

  async create(data: FormData, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.post(this.url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async update(data: FormData, recipeId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.put(`${this.url}/${recipeId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
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