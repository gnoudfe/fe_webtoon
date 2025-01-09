/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthCredentials } from "@/constant/type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import AuthWebtoonApi from "../apiRequest";

export const useLoginMutation = (
  options?: UseMutationOptions<any, unknown, AuthCredentials, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<AuthCredentials, "login">) =>
      AuthWebtoonApi.Login({ body }),
  });
};

export const useRegisterMutation = (
  options?: UseMutationOptions<any, unknown, AuthCredentials, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<AuthCredentials, "register">) =>
      AuthWebtoonApi.Register({ body }),
  });
};
