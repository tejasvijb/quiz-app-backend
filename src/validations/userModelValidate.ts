import { z } from 'zod';

// Custom password validation function
const strongPassword = z.string().refine((value) => {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isValidLength = value.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
}, {
  message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
});


export const userSchema = z.object({
  username: z.string()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Username must be 30 or fewer characters" })
    .trim(),
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  password: strongPassword
});


export const loginSchema = z.object({
    email: z.string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .trim(),
    password: strongPassword
  });

// Get types from Schema

export type LoginType = z.infer<typeof loginSchema>;
export type UserType = z.infer<typeof userSchema>;
