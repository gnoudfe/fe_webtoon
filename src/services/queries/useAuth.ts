/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthCredentials, ChangePassword } from "@/constant/type";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import AuthWebtoonApi from "../apiRequest";
import { useGlobalStore } from "@/stores/state";

export const useChangePasswordMutation = (
  options?: UseMutationOptions<any, unknown, ChangePassword, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (body: Omit<ChangePassword, "change-password">) =>
      AuthWebtoonApi.ChangePassword({ body }),
  });
};

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
export const useVerifyUser = (
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  const { setIsLoggedIn } = useGlobalStore();

  return useQuery({
    ...options,
    queryKey: ["verifyUser"],
    queryFn: async () => {
      const response = await AuthWebtoonApi.VerifyUser();
      if (response.status === "success") {
        setIsLoggedIn(true);
      }
      return response;
    },
  });
};

export const useLogoutMutation = (options?: UseMutationOptions<any>) => {
  const { setIsLoggedIn } = useGlobalStore();

  return useMutation({
    ...options,
    mutationFn: async () => await AuthWebtoonApi.Logout(),
    onSuccess: () => setIsLoggedIn(false),
    mutationKey: ["logout"],
  });
};
export const useChangeAvatarMutation = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      console.log("body", body);
      const response = await AuthWebtoonApi.ChangeAvatar({ body: body });
      if (response.status === "success") {
        return response;
      } else {
        throw new Error(response.message || "Failed to change avatar");
      }
    },
    mutationKey: ["changeAvatar"],
  });
};
