import {IResponse} from "@/types";
import axios, {AxiosError} from "axios";
import {ISignUp} from "../types/signUp";
import {IResetPassword} from "../types/resetPassword";
import {IForgotPassword} from "../types/forgotPassword";
import {ISignIn, ISignInResponse} from "../types/signIn";

class AuthAPI {
  constructor(protected readonly url: string) {}

  async signIn(data: ISignIn): Promise<IResponse<ISignInResponse>> {
    try {
      const response = await axios.post(`${this.url}/sign-in`, data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError);
    }
  }

  async forgotPassword(data: IForgotPassword): Promise<IResponse<undefined>> {
    try {
      const response = await axios.post(`${this.url}/email-request`, {...data, url: process.env.NEXT_PUBLIC_URL});
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError);
    }
  }

  async signUp(data: Omit<ISignUp, "confirmPassword">): Promise<IResponse<undefined>> {
    try {
      const response = await axios.post(`${this.url}/sign-up`, data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError);
    }
  }

  async resetPassword(data: Omit<IResetPassword, "confirmPassword">, code: string): Promise<IResponse<undefined>> {
    try {
      const response = await axios.post(`${this.url}/reset-password`, {...data, code});
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw (error as AxiosError).response?.data;
      throw (error as AxiosError);
    }
  }
}

export const authAPI = new AuthAPI(`${process.env.NEXT_PUBLIC_URL}/auth`);