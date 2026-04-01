import { useMutation } from "@tanstack/react-query";
import * as auth from "../api/auth";
import { AxiosError } from "axios";

export const useRegisterUser = () => {
  return useMutation<
    auth.RegisterResponse,
    AxiosError<{ error?: string }>,
    auth.RegisterRequest
  >({
    mutationKey: ["register"],
    mutationFn: async (body) => await auth.registerUser(body),
  });
};

export const useLoginUser = () => {
  return useMutation<
    auth.LoginResponse,
    AxiosError<{ error?: string }>,
    auth.LoginRequest
  >({
    mutationKey: ["login"],
    mutationFn: async (body) => await auth.loginUser(body),
  });
};