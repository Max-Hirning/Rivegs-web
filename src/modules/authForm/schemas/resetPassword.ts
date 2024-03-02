import {object, string, ref} from "yup";

export const resetPasswordSchema = object({
  password: string().required("Password is required").min(8).max(20),
  confirmPassword: string().required("Please confirm your password").min(8).max(20).oneOf([ref("password")], "Passwords must match"),
});