import {object, string} from "yup";

export const settingsSchema = object({
  login: string().notRequired().max(20), 
  description: string().notRequired().max(75),
  email: string().notRequired().email("Email must be valid"), 
});