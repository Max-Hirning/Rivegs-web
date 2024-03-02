export interface IUser {
  _id: string;
  login: string;
  email: string;
  image?: string;
  recipesIds: string[];
  description?: string;
  savedRecipes: string[];
}