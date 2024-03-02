import {IUser} from "./modules/settings";

export interface IResponse<T> {
  data?: T;
  message: string;
  statusCode: number;
}

export interface IUserSession extends Omit<IUser, "_id"> {
  id: string;
  jwt: string;
}