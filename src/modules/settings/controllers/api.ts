import {IResponse} from "@/types";
import {IUser} from "../types/user";
import axios, {AxiosError} from "axios";
import {ISecurity} from "../types/security";

class UserAPI {
  constructor(protected readonly url: string) {}

  async getUser(userId: string): Promise<IResponse<IUser>> {
    try {
      const response = await axios.get(`${this.url}/${userId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async deleteUser(userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.delete(`${this.url}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async updateSettings(profile: FormData, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.put(`${this.url}/profile/${userId}`, profile, {
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

  async saveUnSaveRecipe(userId: string|undefined, recipeId: string, token: string|undefined): Promise<IResponse<undefined>> {
    try {
      const response = await axios.put(`${this.url}/saved-recipes/${userId}`, {recipe: recipeId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError).response?.data;
    }
  }

  async updateSecurity(data: Omit<ISecurity, "confirmPassword">, userId: string, token: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.put(`${this.url}/security/${userId}`, data, {
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

export const userAPI = new UserAPI(`${process.env.NEXT_PUBLIC_URL}/user`);