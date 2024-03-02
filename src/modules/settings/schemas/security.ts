import {object, string, ref} from "yup";

export const securitySchema = object({
  password: string().required("Password is required").min(8).max(20),
  oldPassword: string().required("Old password is required").min(8).max(20),
  confirmPassword: string().required("Please confirm your password").min(8).max(20).oneOf([ref("password")], "Passwords must match"),
});