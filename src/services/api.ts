import axios from "axios";
import type { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// TypeScript says this is a string, but it cannot check that .env really exists.
// So we check it ourselves and fail early with a helpful message.
if (!baseURL) {
  throw new Error(
    "VITE_API_URL is missing. Add it to your .env file and restart the dev server.",
  );
}

export const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000, // give up after 10 seconds
  headers: { Accept: "application/json" },
});

// Turns any error into a short, friendly sentence (without a final period).
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `Request failed with status ${error.response.status}`;
    }
    if (error.code === "ECONNABORTED") {
      return "The server took too long to respond";
    }
    return "Cannot reach the server";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

// True only when the server answered "404 Not Found".
export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}
