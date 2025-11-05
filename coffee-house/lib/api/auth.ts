
import { api } from "./client";

export const registerUser = async (
  body: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("auth/register", body);
  return res.data;
};

export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("auth/login", body);
  return res.data;
};

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginUser {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: "cash" | "card";
  createdAt: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    user: LoginUser;
  };
  message?: string;
  error?: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: "cash" | "card";
}

export interface RegisterResponse {
  data: {
    access_token: string;
    user: LoginUser;
  };
  message: string;
}
