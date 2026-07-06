import { apiClient } from "../clients/apiClient";
import type { TokenApiResponse, RegisterUserResponse } from "../types/auth";

export const registerUser = async (email: string, password: string) => {
  return await apiClient<RegisterUserResponse>("/auth/signup", {
    body: JSON.stringify({ email, password }),
    method: "POST",
  });
};

export const loginUser = async (email: string, password: string) => {
  return await apiClient<TokenApiResponse>("/auth/login", {
    body: JSON.stringify({ email, password }),
    method: "POST",
  });
};

export const refreshToken = async (refreshToken: string) => {
  return await apiClient<TokenApiResponse>("/auth/refresh", {
    body: JSON.stringify({ refresh_token: refreshToken }),
    method: "POST",
  });
};
