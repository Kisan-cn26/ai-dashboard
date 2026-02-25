import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const mockApiCall = <T>(
  data: T,
  error = "unknown server error",
  delay = 1000,
): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!!data) {
        resolve({
          status: 200,
          message: "Success ✅",
          data: data,
        });
      } else {
        reject({
          status: 404,
          message: error,
        });
      }
    }, delay);
  });
};
