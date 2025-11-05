import { useMutation } from "@tanstack/react-query";
import * as auth from "../api/auth";
import { AxiosError } from "axios";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (body: auth.RegisterRequest) =>
      await auth.registerUser(body),
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