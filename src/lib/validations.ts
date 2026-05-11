// Lightweight validation without a library dependency.
// Swap with zod if you install it: import { z } from "zod"

export type ValidationResult<T> = { success: true; data: T } | { success: false; errors: Record<string, string> };

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isStrongPassword(value: string): boolean {
  return value.length >= 8;
}

export function validateLoginForm(data: Record<string, string>): ValidationResult<{ email: string; password: string }> {
  const errors: Record<string, string> = {};

  if (!data.email) errors.email = "Email is required";
  else if (!isEmail(data.email)) errors.email = "Enter a valid email";

  if (!data.password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) return { success: false, errors };
  return { success: true, data: { email: data.email, password: data.password } };
}

export function validateRegisterForm(
  data: Record<string, string>,
): ValidationResult<{ name: string; email: string; password: string; role: "candidate" | "recruiter" }> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!data.email) errors.email = "Email is required";
  else if (!isEmail(data.email)) errors.email = "Enter a valid email";
  if (!data.password) errors.password = "Password is required";
  else if (!isStrongPassword(data.password)) errors.password = "Password must be at least 8 characters";
  if (data.role !== "candidate" && data.role !== "recruiter") errors.role = "Select a valid role";

  if (Object.keys(errors).length > 0) return { success: false, errors };
  return {
    success: true,
    data: {
      name: data.name.trim(),
      email: data.email,
      password: data.password,
      role: data.role as "candidate" | "recruiter",
    },
  };
}
