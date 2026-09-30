import { api } from "../../../lib/api";
import type {
  AuthResponse,
  LoginResponse,
} from "../types/auth.types";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return response.data;
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return response.data;
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const response = await api.get<AuthResponse>("/auth/me");

  return response.data;
}
